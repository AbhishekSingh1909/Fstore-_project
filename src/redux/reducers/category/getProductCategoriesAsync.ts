import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import Category from "../../../types/Category";

export const getProductCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { rejectValue: AxiosError }
>("getProductCategoriesAsync", async (_, { rejectWithValue }) => {
  try {
    console.log("get category");
    const response = await axios.get(
      `http://localhost:5216/api/v1/categories`
    );
    console.log("got category");
    console.log(response.data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
