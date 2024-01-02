import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../../types/User";
import { CreateNewUser } from "../../../types/CreateNewUser";

export const createUsersAsync = createAsyncThunk<
  User,
  CreateNewUser,
  { rejectValue: AxiosError }
>("users/createUsersAsync", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `https://fakestore.azurewebsites.net/api/v1/users`,
      user
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
