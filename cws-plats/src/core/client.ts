import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { env } from "./env/client.mjs";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "@/store/store.js";

const client: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiUrl = (type: "user" | "action" | "cws") => {
  switch (type) {
    case "user":
      return env.NEXT_PUBLIC_USER_API_URL;
    case "action":
      return env.NEXT_PUBLIC_ACTION_API_URL;
    case "cws": {
      return env.NEXT_PUBLIC_CLIENT_WEB_API_URL;
    }
  }
};

export const initInterceptors = (store: ToolkitStore<RootState>) => {
  client.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.jwt?.access_token;
    if (token && config.headers) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }
    return config;
  });
};

export default client;
