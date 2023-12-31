import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Images from "../../../types/Images";
import { UpdateProductImageDto } from "../../../types/CreateProductImage";


export const updateProductImagesAsync = createAsyncThunk<
    Images,
    UpdateProductImageDto,
    { rejectValue: AxiosError }
>("images/updateProductImagesAsync", async (productImage, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.patch(
            `http://localhost:5216/api/v1/images/${productImage.id}`, productImage.imageUrl, config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
