import { createAsyncThunk } from "@reduxjs/toolkit";

import { UpdateUser } from "../../types/UpdateUser";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User";

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (user: UpdateUser, { rejectWithValue }) => {
    try {
      const response = await axios.put<User>(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        user.updateUser
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);
