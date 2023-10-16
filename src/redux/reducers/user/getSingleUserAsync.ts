import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../../types/User";

export const getSingleUsersAsync = createAsyncThunk<
  User,
  number,
  { rejectValue: AxiosError }
>("users/getSingleUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(
      `https://api.escuelajs.co/api/v1/users/${userId}`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
