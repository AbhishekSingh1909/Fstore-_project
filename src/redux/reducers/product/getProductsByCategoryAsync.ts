import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import Product from "../../../types/Product";

export const getProductsByCategoryAsync = createAsyncThunk<
  Product[],
  string,
  { rejectValue: AxiosError }
>("products/getProductsByCategoryAsync", async (id, { rejectWithValue }) => {
  try {

    const response = await axios.get(
      `https://fakestore.azurewebsites.net/api/v1/categories/${id}/products`
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
