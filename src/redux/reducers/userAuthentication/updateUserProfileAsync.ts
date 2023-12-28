import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UpdateUser } from "../../../types/UpdateUser";
import { User } from "../../../types/User";

export const updateUserProfileAsync = createAsyncThunk<
    User,
    UpdateUser,
    { rejectValue: AxiosError }
>("auth/updateUserProfileAsync", async (user, { rejectWithValue }) => {
    const access_token = localStorage.getItem("access_token");
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.patch(
            "http://localhost:5216/api/v1/users/profile",
            user.updateUser, config
        );
        debugger;
        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error);
    }
});
