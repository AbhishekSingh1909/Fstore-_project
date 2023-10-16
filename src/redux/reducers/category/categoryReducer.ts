import { createSlice } from "@reduxjs/toolkit";

import Category from "../../../types/Category";
import { getProductCategoriesAsync } from "./getProductCategoriesAsync";
import { AxiosError } from "axios";

const initialState: {
  categories: Category[];
  error?: string;
  loading: boolean;
} = {
  categories: [],
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getProductCategoriesAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getProductCategoriesAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
          state.loading = false;
        }
      });
  },
});

const ProductCategoryReducer = categorySlice.reducer;

export default ProductCategoryReducer;
