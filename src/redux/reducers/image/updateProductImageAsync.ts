import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Images from "../../../types/Images";
import { UpdateProductImageDto } from "../../../types/CreateProductImage";


export const updateProductImagesAsync = createAsyncThunk<
    Images,
    UpdateProductImageDto,
    { rejectValue: AxiosError }
>("images/updateProductImagesAsync", async (productImage, { rejectWithValue }) => {

    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.patch(
            `https://fakestore.azurewebsites.net/api/v1/images/${productImage.id}`, productImage.imageUrl, config
        );

        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
