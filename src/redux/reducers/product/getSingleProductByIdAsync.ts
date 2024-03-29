import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import Product from "../../../types/Product";

export const getSingleProductByIdAsync = createAsyncThunk<
  Product,
  string,
  { rejectValue: AxiosError }
>(
  "products/getSingleProductByIdAsync",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestore.azurewebsites.net/api/v1/products/${productId}`
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);
