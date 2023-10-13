import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductsByCategoryAsync } from "./getProductsByCategoryAsync";
import UpdateProduct from "../../types/UpdateProduct";
import Product from "../../types/Product";
import { createProductAsync } from "./createProductAsync";
import { deleteProductAsync } from "./deleteProductAsync";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getSingleProductByIdAsync } from "./getSingleProductByIdAsync";

const initialState: {
  products: Product[];
  product?: Product;
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

export const getAllProductsAsync = createAsyncThunk<
  Product[],
  void,
  { rejectValue: AxiosError }
>("products/getAllProductsAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error);
  }
});

export const updateProductAsync = createAsyncThunk<
  Product,
  UpdateProduct,
  { rejectValue: AxiosError }
>(
  "products/updateProductAsync",
  async (params: UpdateProduct, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${params.id}`,
        params.updateProduct
      );
      if (!response.data) {
        throw new Error("Could not update product");
      }
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload.toLowerCase() === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = undefined;
    });

    builder.addCase(getAllProductsAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        if (action.payload instanceof Error)
          state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getSingleProductByIdAsync.fulfilled, (state, action) => {
        state.products = [action.payload];
        state.product = action.payload;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(getSingleProductByIdAsync.rejected, (state, action) => {
        if (action.payload instanceof Error)
          state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getSingleProductByIdAsync.pending, (state, action) => {
        state.loading = true;
      });
    builder
      .addCase(createProductAsync.fulfilled, (state, action) => {
        const foundIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        console.log("createProductAsync.fulfilled");
        console.log("state.products", state.products.length);
        if (foundIndex === -1) {
          console.log("create foundIndex", foundIndex);
          state.products.push(action.payload);
        }
        console.log("state.products", state.products.length);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const foundIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );

        if (foundIndex !== -1) {
          state.products[foundIndex] = action.payload;
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (typeof action.payload === "number") {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        }
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      });

    builder
      .addCase(getProductsByCategoryAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getProductsByCategoryAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductsByCategoryAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      });
  },
});

const productReducer = productsSlice.reducer;
export const { sortByPrice } = productsSlice.actions;

export default productReducer;
