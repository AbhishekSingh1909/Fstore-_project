import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const deleteProductAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: AxiosError }
>("products/deleteProductAsync", async (productId, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.delete<boolean>(
      `https://fakestore.azurewebsites.net/api/v1/products/${productId}`, config
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
