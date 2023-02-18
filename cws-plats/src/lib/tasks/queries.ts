import { Task } from "./types";
import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchTasks = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["tasks", { page, limit }],
    queryFn: async () => {
      const response = await client.get<BaseResponse<Task[]>>(
        `${getApiUrl("action")}/tasks-cws`,
        {
          params: {
            page,
            limit,
          },
        }
      );

      return response;
    },
  });
};

export const useMutateTask = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await client.post<BaseResponse>(
        `${getApiUrl("action")}/tasks-cws/store`,
        data
      );

      return handleResponse(res);
    },
  });
};
