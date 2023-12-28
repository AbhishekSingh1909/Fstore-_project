import { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../../types/User";
import { createUsersAsync } from "./createUserAsync";
import { updateUserAsync } from "./updateUserAsync";
import { getAllUsersAsync } from "./getAllUsersAsync";
import { getSingleUsersAsync } from "./getSingleUserAsync";
import { deleteUserAsync } from "./deleteUserAsync";
import { updateUserProfileAsync } from "../userAuthentication/updateUserProfileAsync";

const initialState: {
  users: User[];
  error?: string;
  loading: boolean;
  singleUser?: User;
} = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUser: (state) => {
      return {
        ...state,
        error: undefined,
        loading: false,
        singleUser: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUsersAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (p) => p.id === action.payload.id
        );

        if (foundIndex === -1) {
          state.users.push(action.payload);
          state.singleUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(createUsersAsync.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.loading = false;
        state.singleUser = undefined;
      })
      .addCase(createUsersAsync.pending, (state, action) => {
        state.error = undefined;
        state.loading = true;
      });
    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (foundIndex > -1) {
          state.users[foundIndex] = action.payload;
          state.singleUser = action.payload;
          state.error = undefined;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
          state.loading = false;
          state.singleUser = undefined;
        }
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      });

    builder
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = undefined;
        state.singleUser = undefined;
        state.loading = false;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.singleUser = undefined;
          state.error = undefined;
        }
      })
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.loading = true;
      });
    builder
      .addCase(getSingleUsersAsync.fulfilled, (state, action) => {
        state.users = [action.payload];
        state.singleUser = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getSingleUsersAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        }
      })
      .addCase(getSingleUsersAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        state.users = state.users.filter(
          (p) => p.id !== action.payload.toString()
        );
      }
      state.error = undefined;
      state.singleUser = undefined;
      state.loading = false;
    })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.singleUser = undefined;
          state.error = undefined;
        }
      })
      .addCase(deleteUserAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
  },
});

const userReducer = userSlice.reducer;
export const { resetUser } = userSlice.actions;
export default userReducer;
