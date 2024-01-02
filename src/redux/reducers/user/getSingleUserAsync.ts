import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../../types/User";

export const getSingleUsersAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: AxiosError }
>("users/getSingleUser", async (userId, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get<User>(
      `https://fakestore.azurewebsites.net/api/v1/users/${userId}`, config
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
