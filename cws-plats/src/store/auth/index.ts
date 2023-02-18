import { createSlice } from "@reduxjs/toolkit";
import client from "../../core/client";
import {
  BaseResponse,
  handleRefreshTokenResponse,
} from "./../../core/handleResponse";
import { AuthState, LoginResponse, RefreshTokenResponse } from "./types";

const initialState: AuthState = {
  user: null,
};

export const refreshTokenAsync = async (refreshToken: string) => {
  const response = await client.post<BaseResponse<RefreshTokenResponse>>(
    "/api/auth/refresh-token",
    {
      refreshToken,
    }
  );
  return handleRefreshTokenResponse(response);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    updateAccessToken(state, action: { payload: { accessToken: string } }) {
      console.log(state.user);

      if (state.user) {
        if (state.user.jwt?.access_token) {
          state.user.jwt.access_token = action.payload.accessToken;
        }
      }
    },
    login(state, action: { payload: LoginResponse }) {
      state.user = action.payload;
    },
  },
});

export const { logout, updateAccessToken, login } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth?.user;
export const selectUser = (state: { auth: AuthState }) => state.auth?.user;

export default authSlice.reducer;
