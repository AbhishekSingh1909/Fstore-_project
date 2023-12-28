import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Order } from "../../../types/orderDto";
import { createOrderAsync } from "./createOrderAsync";
import { AxiosError } from "axios";
import { getAllOrdersAsync } from "./getAllOrdersAsync";

const initialState:
    {
        orders: Order[];
        error?: string;
        loading: boolean;
        order?: Order;
    } =
{
    orders: [],
    loading: false,
};


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:
    {
        resetOrder: (state) => {
            return {
                ...state,
                error: undefined,
                loading: false,
                order: undefined,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderAsync.fulfilled, (state, action) => {
            debugger;
            const foundIndex = state.orders.findIndex(
                (p) => p.id === action.payload.id
            );
            if (foundIndex === -1) {
                state.orders.push(action.payload);
                state.order = action.payload;
                state.loading = false;
            }
        })
            .addCase(createOrderAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
                state.order = undefined;
            })

            .addCase(createOrderAsync.pending, (state, action) => {
                state.error = undefined;
                state.loading = true;
            })
        builder.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.error = undefined;
            state.order = undefined;
            state.loading = false;
        })
            .addCase(getAllOrdersAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(getAllOrdersAsync.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
    }

});

const orderReducer = orderSlice.reducer;
export const {
    resetOrder
} = orderSlice.actions;

export default orderReducer;
