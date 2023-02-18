import client, { getApiUrl } from "@/core/client";
import { handleResponse } from "@/core/handleResponse";
import { useQuery } from "@tanstack/react-query";
import { EventListResponse } from ".";

export const useFetchEvents = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["events", { page: page, limit }],
    queryFn: async () => {
      const res = await client.get<EventListResponse>(
        `${getApiUrl("action")}/cws/events`,
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
