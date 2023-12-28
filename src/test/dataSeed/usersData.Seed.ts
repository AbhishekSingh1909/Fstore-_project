import { JWTToken, User } from "../../types/User";

export const usersData: User[] = [
  {
    id: '08276e93-2134-4f8e-9960-43b2a84ea101',
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "Customer",
    avatar: "https://i.imgur.com/DumuKkD.jpeg",
  },
  {
    id: '1d696481-3fa2-4d91-a04d-76fa9f986c70',
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "Customer",
    avatar: "https://i.imgur.com/00qWleT.jpeg",
  },
  {
    id: "2545bdeb-4503-4f27-88a4-d9061b8e7ef8",
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "Admin",
    avatar: "https://i.imgur.com/5mPmJYO.jpeg",
  },
];

export const userToken: JWTToken = {
  access_token: "my-access-token",
  refresh_token: "my-refresh-token",
};
