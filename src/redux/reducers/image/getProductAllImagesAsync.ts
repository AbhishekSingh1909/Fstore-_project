import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Images from "../../../types/Images";

export const getProductAllImagesAsync = createAsyncThunk<
    Images[],
    string,
    { rejectValue: AxiosError }
>("images/getProductAllImagesAsync", async (id, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.get(
            `http://localhost:5216/api/v1/images/product/${id}`, config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
