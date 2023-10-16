import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { AxiosError } from "axios";

import { usersData } from "../dataSeed/usersData.Seed";
import { CreateNewUser } from "../../types/CreateNewUser";
import { User } from "../../types/User";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),
  rest.get("https://api.escuelajs.co/api/v1/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    const user = usersData.find((u) => u.id === Number(id));
    return res(ctx.json(user));
  }),
  rest.post("https://api.escuelajs.co/api/v1/users/", async (req, res, ctx) => {
    const input: CreateNewUser = await req.json();
    const user: User = {
      id: usersData.length + 1,
      name: input.name,
      email: input.email,
      password: input.password,
      avatar: input.avatar,
      role: "customer",
    };
    usersData.push(user);
    return res(ctx.json(user));
  }),

  rest.put(
    "https://api.escuelajs.co/api/v1/users/:id",
    async (req, res, ctx) => {
      const input: UpdateUserDto = await req.json();
      const { id } = req.params;
      const user = usersData.find((u) => u.id === Number(id));
      if (user) {
        const updateUser: UpdateUser = {
          id: user.id,
          updateUser: input,
        };
        return res(ctx.json(updateUser));
      } else {
        const error = new AxiosError();
        return res(ctx.status(400), ctx.json(error));
      }
    }
  ),
];

const userServer = setupServer(...handlers);

export default userServer;
