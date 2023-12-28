import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { CreateOrder, Order } from "../../../types/orderDto";

export const getAllOrdersAsync = createAsyncThunk<
    Order[],
    void,
    { rejectValue: AxiosError }
>("orders/getAllOrdersAsync", async (_, { rejectWithValue }) => {
    debugger;
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.get(
            "http://localhost:5216/api/v1/orders", config
        );
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
