import client, { getApiUrl } from "@/core/client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { UserListResponse } from "./types";

export type SearchParamsType = {
  name?: string;
  email?: string;
  status?: string;
  date_to?: string;
  date_end?: string;
};
export const searchSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional(),
    date_to: z.date().optional().nullable(),
    date_end: z.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.date_to && data.date_end) {
        return data.date_to.getTime() < data.date_end.getTime();
      }
      return true;
    },
    {
      message: "Date from must be less than date to",
      path: ["date_to"],
    }
  );

export const useFetchUserList = ({
  page,
  limit,
  searchParams,
}: {
  page: number;
  limit: number;
  searchParams?: SearchParamsType;
}) => {
  // remove all "" values from searchParams
  const filteredParams = Object.fromEntries(
    Object.entries(searchParams || {})?.filter(([, v]) => v !== "")
  );

  return useQuery({
    queryKey: ["userList", page, limit, searchParams],
    queryFn: async () => {
      const res = await client.get<UserListResponse>(
        `${getApiUrl("user")}/cws`,
        {
          params: {
            page,
            limit,
            ...filteredParams,
          },
        }
      );

      return res.data;
    },
  });
};
