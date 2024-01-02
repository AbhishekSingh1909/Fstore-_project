import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


export const deleteUserProfileAsync = createAsyncThunk<
    boolean,
    void,
    { rejectValue: AxiosError }
>("auth/deleteUserProfileAsync", async (_, { rejectWithValue }) => {
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.delete(
            "https://fakestore.azurewebsites.net/api/v1/users/profile",
            config
        );

        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
