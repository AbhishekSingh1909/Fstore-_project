import { rest } from "msw";
import { setupServer } from "msw/node";

import { usersData, userToken } from "../dataSeed/usersData.Seed";
import { AxiosError } from "axios";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const user = usersData.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const token = userToken.access_token + "_" + user.id;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        throw new AxiosError("user's cedential is not valid");
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    const access_token = token?.split("_")[0];
    const userId = token?.split("_")[1];

    const user = usersData.find((u) => u.id === userId);

    if (access_token === userToken.access_token && user) {
      return res(ctx.json(user));
    } else {
      ctx.status(401);
      throw new AxiosError("The user is not authorized");
    }
  }),
];

const authServer = setupServer(...handlers);

export default authServer;
