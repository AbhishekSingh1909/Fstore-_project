import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserAddress } from "../../../types/Address";



export const getAddressAsync = createAsyncThunk<
    UserAddress,
    void,
    { rejectValue: AxiosError }
>("address/getAddressAsync", async (_, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.get(
            "http://localhost:5216/api/v1/addresses", config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
