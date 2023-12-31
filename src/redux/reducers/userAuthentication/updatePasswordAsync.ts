import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UpdateUserPassword } from "../../../types/UpdateUser";

export const updatePasswordAsync = createAsyncThunk<
  boolean,
  UpdateUserPassword,
  { rejectValue: AxiosError }
>("users/updatePasswordAsync", async (user, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  debugger;
  try {
    const response = await axios.patch(
      "http://localhost:5216/api/v1/users/changepassword",
      user, config
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
