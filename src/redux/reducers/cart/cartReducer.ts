import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItem } from "../../../types/CartItem";
import Product from "../../../types/Product";

const initialState: {
  cartItems: CartItem[];
} = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem = { ...action.payload, quantity: 1 };
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (foundIndex !== -1) {
        state.cartItems[foundIndex].quantity += 1;
      } else {
        state.cartItems.push(cartItem);
      }
    },
    detetFromCart: (state, action: PayloadAction<number>) => {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (foundIndex !== -1) {
        state.cartItems.splice(foundIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    decreaseQunatity: (state, action: PayloadAction<number>) => {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (foundIndex !== -1) {
        if (state.cartItems[foundIndex].quantity > 1) {
          state.cartItems[foundIndex].quantity -= 1;
        } else {
          state.cartItems.splice(foundIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (foundIndex !== -1) {
        state.cartItems[foundIndex].quantity += 1;
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  detetFromCart,
  clearCart,
  decreaseQunatity,
  increaseQuantity,
} = cartSlice.actions;

export default cartReducer;
