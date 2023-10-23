import { createAsyncThunk } from "@reduxjs/toolkit";
import { JWTToken, LoginCredential, User } from "../../../types/User";

import axios, { AxiosError } from "axios";
import { authenticateUserAsync } from "./authenticateUserAsync";

export const userLogInAsync = createAsyncThunk<
  User,
  LoginCredential,
  { rejectValue: AxiosError }
>(
  "users/userLogInAsync",
  async (loginParams: LoginCredential, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post<JWTToken>(
        `https://api.escuelajs.co/api/v1/auth/login`,
        loginParams
      );
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      const userAuthentication = await dispatch(
        authenticateUserAsync(access_token)
      );

      if (
        (userAuthentication.meta.requestStatus === "rejected" &&
          typeof userAuthentication.payload == "string") ||
        !userAuthentication.payload
      ) {
        throw new AxiosError(userAuthentication.payload || "UnAthorized User");
      } else {
        return userAuthentication.payload as User;
      }
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);
