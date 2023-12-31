import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { AxiosError } from "axios";

import { usersData } from "../dataSeed/usersData.Seed";
import { CreateNewUser } from "../../types/CreateNewUser";
import { User } from "../../types/User";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";

export const handlers = [
  rest.get("http://localhost:5216/api/v1/users", (req, res, ctx) => {

    // Check for the authorization header in the request
    const authorizationHeader = req.headers.get('Authorization');

    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
      return res(ctx.json(usersData));
    }
    else {
      console.log("error Unauthorized")
      const error = new Error('Unauthorized');
      return res(ctx.status(401), ctx.json(error));
    }
  }),
  rest.get("http://localhost:5216/api/v1/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    // Check for the authorization header in the request
    const authorizationHeader = req.headers.get('Authorization');
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
      //   const user = usersData.find((u) => u.id === id);
      // return res(ctx.json(user));
      const user = usersData.find((u) => u.id === id);
      if (user) {
        return res(ctx.json(user));
      }
      else {
        const error = new AxiosError();
        return res(ctx.status(400), ctx.json(error));
      }
    }
    else {
      const error = new Error('Unauthorized');
      return res(ctx.status(401), ctx.json(error));
    }
  }),
  rest.post("http://localhost:5216/api/v1/users", async (req, res, ctx) => {
    const input: CreateNewUser = await req.json();
    const user: User = {
      id: "4990a687-05b1-4957-a7d6-5684322b152e",
      name: input.name,
      email: input.email,
      password: input.password,
      avatar: input.avatar,
      role: "Customer",
    };
    usersData.push(user);
    return res(ctx.json(user));
  }),

  rest.patch(
    "http://localhost:5216/api/v1/users/:id",
    async (req, res, ctx) => {
      const input: UpdateUserDto = await req.json();
      const { id } = req.params;
      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');

      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const user = usersData.find((u) => u.id === id);
        if (user) {
          const updateUser: UpdateUser = {
            id: user.id,
            updateUser: input,
          };
          return res(ctx.json(updateUser));
        }
        else {
          const error = new AxiosError();
          return res(ctx.status(400), ctx.json(error));
        }
      }
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }

    }
  ),
  rest.delete(
    "http://localhost:5216/api/v1/users/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');

      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const user = usersData.find((u) => u.id === id);
        if (user) {
          return res(ctx.json(true));
        } else {
          return res(ctx.json(false));
        }
      }
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }
    }
  ),
];

const userServer = setupServer(...handlers);

export default userServer;
