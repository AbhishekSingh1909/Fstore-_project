import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


import { CreateAddress, UserAddress } from "../../../types/Address";


export const createAddressAsync = createAsyncThunk<
    UserAddress,
    CreateAddress,
    { rejectValue: AxiosError }
>("address/createAddressAsync", async (address, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.post(
            "http://localhost:5216/api/v1/addresses", address, config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
