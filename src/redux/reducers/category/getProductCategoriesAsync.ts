import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import Category from "../../../types/Category";

export const getProductCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { rejectValue: AxiosError }
>("getProductCategoriesAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/categories`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
