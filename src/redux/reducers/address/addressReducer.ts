import { createSlice } from "@reduxjs/toolkit";
import { UserAddress } from "../../../types/Address";
import { getAddressAsync } from "./getAddressAsync";
import { AxiosError } from "axios";
import { createAddressAsync } from "./createAddressAsync";
import { updateAddressAsync } from "./updateAddressAsync";

const initialState:
    {
        address?: UserAddress;
        error?: string;
        loading: boolean;
    } =
{
    loading: false,
};
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers:
    {
        resetAddress: (state) => {
            state.address = undefined;
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAddressAsync.fulfilled, (state, action) => {
            state.address = action.payload;
            state.loading = false;
        })
            .addCase(getAddressAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(getAddressAsync.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
        builder.addCase(createAddressAsync.fulfilled, (state, action) => {
            state.address = action.payload;
            state.loading = false;
        })
            .addCase(createAddressAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(createAddressAsync.pending, (state, action) => {
                state.address = action.payload;
                state.loading = false;
            })
        builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
            debugger;
            state.address = action.payload;
            state.loading = false;
        })
            .addCase(updateAddressAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(updateAddressAsync.pending, (state, action) => {
                state.address = action.payload;
                state.loading = false;
            })
    }
});

export const {
    resetAddress
} = addressSlice.actions;

const addressReducer = addressSlice.reducer;
export default addressReducer;