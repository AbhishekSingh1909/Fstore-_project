import { createSlice } from "@reduxjs/toolkit";
import { User, UserAuth } from "../../../types/User";

import { userLogInAsync } from "./userLogInAsync";
import { authenticateUserAsync } from "./authenticateUserAsync";

export type AuthType = {
  user?: User;
  error?: string;
  loading?: boolean;
};

const initialState: AuthType = {
  user: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = undefined;
      state.error = undefined;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogInAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(userLogInAsync.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.loading = false;
      })
      .addCase(userLogInAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      });
    builder
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(authenticateUserAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.loading = false;
      });
  },
});
const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
export const userAccess_token = (state: { auth: UserAuth }) =>
  state.auth.jwtToken?.access_token;
export const userRefresh_token = (state: { auth: UserAuth }) =>
  state.auth.jwtToken?.refresh_token;
export const currentUser = (state: { user: UserAuth }) => state.user.user;

export default authReducer;
