import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Images from "../../../types/Images";
import { CreateProductImageDto } from "../../../types/CreateProductImage";


export const createProductImageAsync = createAsyncThunk<
    Images,
    CreateProductImageDto,
    { rejectValue: AxiosError }
>("images/createProductImageAsync", async (productImage, { rejectWithValue }) => {

    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.post(
            "https://fakestore.azurewebsites.net/api/v1/images", productImage, config
        );

        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
