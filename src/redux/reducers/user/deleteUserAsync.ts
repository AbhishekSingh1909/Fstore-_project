import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const deleteUserAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: AxiosError }
>("users/deleteUserAsync", async (id, { rejectWithValue }) => {
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.delete(
            `http://localhost:5216/api/v1/users/${id}`, config
        );
        return id;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
