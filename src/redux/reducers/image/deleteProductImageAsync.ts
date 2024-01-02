import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const deleteProductImageAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: AxiosError }
>("images/deleteProductImageAsync", async (id, { rejectWithValue }) => {

    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.delete(
            `https://fakestore.azurewebsites.net/api/v1/images/${id}`, config
        );

        return id;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
