import client, { getApiUrl } from "@/core/client";
import { BaseResponse } from "@/core/handleResponse";
import { useQuery } from "@tanstack/react-query";
import { Group } from "../groups";

export const useFetchGroups = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["groups", { page, limit }],

    queryFn: async () => {
      return (
        await client.get<BaseResponse<Group[]>>(
          `${getApiUrl("action")}/cws/groups`,
          {
            params: {
              page,
              limit,
            },
          }
        )
      ).data;
    },
  });
};
