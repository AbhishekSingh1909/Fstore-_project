import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const deleteProductImageAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: AxiosError }
>("images/deleteProductImageAsync", async (id, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.delete(
            `http://localhost:5216/api/v1/images/${id}`, config
        );
        debugger;
        return id;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
