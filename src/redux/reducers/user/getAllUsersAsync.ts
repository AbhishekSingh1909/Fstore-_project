import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../../types/User";

export const getAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: AxiosError }
>("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<User[]>(
      "https://api.escuelajs.co/api/v1/users"
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
