import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { useQuery } from "@tanstack/react-query";
import { AssetsResponse } from ".";

export const useFetchRewards = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["rewards", { page: page, limit }],
    queryFn: async () => {
      const res = await client.get<BaseResponse<AssetsResponse>>(
        `${getApiUrl("action")}/rewards`,
        {
          params: {
            page: page,
            limit,
          },
        }
      );

      return handleResponse(res);
    },
  });
};
