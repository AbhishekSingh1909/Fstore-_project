import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { CreateProduct } from "../../types/CreateProduct";
import Product from "../../types/Product";

export const createProductAsync = createAsyncThunk<
  Product,
  CreateProduct,
  { rejectValue: AxiosError }
>("products/createProduct", async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `https://api.escuelajs.co/api/v1/products/`,
      product
    );
    console.log("product has created", response.data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.log("product has created", error);
    return rejectWithValue(error);
  }
});
