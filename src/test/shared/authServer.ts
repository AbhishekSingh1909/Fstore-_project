import { rest } from "msw";
import { setupServer } from "msw/node";

import { usersData, userToken } from "../dataSeed/usersData.Seed";
import { AxiosError } from "axios";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.post(
    `https://fakestore.azurewebsites.net/api/v1/auth/login`,
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const user = usersData.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const token = userToken.access_token + "_" + user.id;
        return res(ctx.json(token));
      } else {
        ctx.status(401);
        throw new AxiosError("user's cedential is not valid");
      }
    }
  ),
  rest.get("https://fakestore.azurewebsites.net/api/v1/users/profile", (req, res, ctx) => {
    // Check for the authorization header in the request
    const authorizationHeader = req.headers.get('Authorization');

    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
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
    }
    else {
      const error = new Error('Unauthorized');
      return res(ctx.status(401), ctx.json(error));
    }
  }),
  rest.patch(
    "https://fakestore.azurewebsites.net/api/v1/users/profile",
    async (req, res, ctx) => {
      const input: UpdateUserDto = await req.json();
      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');

      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const updateUser: UpdateUser = {
          id: "08276e93-2134-4f8e-9960-43b2a84ea101",
          updateUser: input
        };
        return res(ctx.json(updateUser));
      }
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }

    }
  ),
];

const authServer = setupServer(...handlers);

export default authServer;
