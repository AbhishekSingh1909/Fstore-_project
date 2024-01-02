import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UpdateUser } from "../../../types/UpdateUser";
import { User } from "../../../types/User";

export const updateUserAsync = createAsyncThunk<
  User,
  UpdateUser,
  { rejectValue: AxiosError }
>("users/updateUserAsync", async (user, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.patch(
      `https://fakestore.azurewebsites.net/api/v1/users/${user.id}`,
      user.updateUser, config
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
