import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UpdateUser } from "../../../types/UpdateUser";
import { User } from "../../../types/User";

export const updateUserAsync = createAsyncThunk<
  User,
  UpdateUser,
  { rejectValue: AxiosError }
>("users/updateUserAsync", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${user.id}`,
      user.updateUser
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
