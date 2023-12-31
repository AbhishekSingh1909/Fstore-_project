import { createSlice } from "@reduxjs/toolkit";
import Images from "../../../types/Images";
import { getProductAllImagesAsync } from "./getProductAllImagesAsync";
import { AxiosError } from "axios";
import { createProductImageAsync } from "./createProductImageAsync";
import { updateProductImagesAsync } from "./updateProductImageAsync";
import { deleteProductImageAsync } from "./deleteProductImageAsync";

const initialState:
    {
        images: Images[];
        error?: string;
        loading: boolean;
    } =
{
    images: [],
    loading: false,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductAllImagesAsync.fulfilled, (state, action) => {
            debugger;
            state.images = action.payload;
            state.error = undefined;
            state.loading = false;
        })
            .addCase(getProductAllImagesAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(getProductAllImagesAsync.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
        builder.addCase(createProductImageAsync.fulfilled, (state, action) => {
            debugger;
            const foundIndex = state.images.findIndex(
                (p) => p.id === action.payload.id
            );
            if (foundIndex === -1) {
                state.images.push(action.payload);
                state.loading = false;
            }
        })
            .addCase(createProductImageAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(createProductImageAsync.pending, (state, action) => {
                state.error = undefined;
                state.loading = true;
            })
        builder.addCase(updateProductImagesAsync.fulfilled, (state, action) => {
            debugger;
            const foundIndex = state.images.findIndex(
                (p) => p.id === action.payload.id
            );
            if (foundIndex > -1) {
                state.images[foundIndex] = action.payload;
                state.loading = false;
            }
        })
            .addCase(updateProductImagesAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(updateProductImagesAsync.pending, (state, action) => {
                state.error = undefined;
                state.loading = true;
            })
        builder.addCase(deleteProductImageAsync.fulfilled, (state, action) => {
            debugger;
            if (typeof action.payload === "string") {
                state.images = state.images.filter(
                    (p) => p.id !== action.payload.toString()
                );
                state.loading = false;
                state.error = undefined;
            }
        })
            .addCase(deleteProductImageAsync.rejected, (state, action) => {
                if (action.payload instanceof AxiosError)
                    state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(deleteProductImageAsync.pending, (state, action) => {
                state.error = undefined;
                state.loading = true;
            })
    }
})
const imageReducer = imageSlice.reducer;

export default imageReducer;
;
