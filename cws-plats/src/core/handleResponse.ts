import { AxiosResponse } from "axios";
import { logout } from "../store/auth";
import { rootStore as store } from "../store/store";
import { queryClient } from "./queryClient";

const isOk = (status: number) => status >= 200 && status < 300;

export interface BaseResponse<T = any> {
  error?: { message: string; issues: any } | null;
  data: T;
  success?: boolean;
  message?: string;
  meta?: Meta;
}

export interface Meta {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
}

/**
 * @name handleResponse
 * @description Handles response from API
 * @param {AxiosResponse<BaseResponse<T>>} response
 * @returns {Promise<T>}
 */

// handleResponse function is used to handle the response from the API
export const handleResponse = async <T = any>(
  response: AxiosResponse<BaseResponse<T>>
): Promise<T> => {
  // Get the status code from the response
  const status = response.status;

  // If the status code is not in the 200 range, we throw an error
  if (!isOk(status)) {
    // If the status code is 401, we'll log the user out
    switch (status) {
      case 401:
        store.dispatch(logout());
        queryClient.refetchQueries();
        break;
      default:
        break;
    }

    // Get the data from the response
    const { data } = response;

    // Throw the data to the caller
    throw data;
  }

  // If the response was successful, we return the data from the response
  return response.data.data;
};

export const handleRefreshTokenResponse = async <T>(
  response: AxiosResponse<BaseResponse<T>>
) => {
  const status = response.status;

  if (!isOk(status)) {
    const {
      data: { error },
    } = response;

    throw error;
  }

  return response.data;
};
