export interface User {
  id: string;
  name: string;
  role: "Customer" | "Admin";
  email: string;
  password: string;
  avatar: string;
}

export type JWTToken = {
  access_token: string;
  refresh_token: string;
};

export interface LoginCredential {
  email: string;
  password: string;
}

export type UserAuth = {
  user: User | undefined;
  jwtToken: JWTToken | undefined;
};

export enum Role {
  "Admin",
  "Customer",
}
