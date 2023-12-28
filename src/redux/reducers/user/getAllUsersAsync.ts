import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../../types/User";

export const getAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: AxiosError }
>("users/getAllUsers", async (_, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  debugger;
  try {
    const response = await axios.get<User[]>(
      "http://localhost:5216/api/v1/users", config
    );
    debugger;
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
