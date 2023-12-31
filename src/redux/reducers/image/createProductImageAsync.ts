import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Images from "../../../types/Images";
import { CreateProductImageDto } from "../../../types/CreateProductImage";


export const createProductImageAsync = createAsyncThunk<
    Images,
    CreateProductImageDto,
    { rejectValue: AxiosError }
>("images/createProductImageAsync", async (productImage, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.post(
            "http://localhost:5216/api/v1/images", productImage, config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
