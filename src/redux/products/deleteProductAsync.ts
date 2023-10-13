import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const deleteProductAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: AxiosError }
>("products/deleteProductAsync", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete<boolean>(
      `https://api.escuelajs.co/api/v1/products/${productId}`
    );
    if (!response.data) {
      throw new AxiosError("Could not delete product");
    }
    return productId;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});
