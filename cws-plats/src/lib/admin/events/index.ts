import { getApiUrl } from "../../../core/client";
import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { z } from "zod";

export const createEventSchema = z.object({
  task_id: z.string(),
  name: z.string(),
  type: z.coerce.number(),
  max_job: z.coerce.number(),
  status: z.coerce.number(),
  details: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        status: z.number(),
      })
    )
    .min(1),
  rewards: z.object({ amount: z.number(), reward_id: z.string() }),
});

export const updateEventSchema = createEventSchema.extend({
  id: z.string(),
});

export interface EventListResponse {
  success: boolean;
  message?: any;
  data: Data;
}

interface Data {
  current_page: number;
  data: Event[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Event {
  id: string;
  task_id: string;
  name: string;
  description?: string;
  banner_url: string;
  type: number;
  max_job: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  task: Task;
  task_event_detail: Taskeventdetail[];
}

interface Taskeventdetail {
  task_event_id: string;
  name?: any;
  description?: any;
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface Task {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  banner_url: string;
  start_at?: any;
  end_at?: any;
  status: number;
  type: number;
  order: number;
  created_at: string;
  cover_url: string;
}

export const postCreateEvent = async (
  data: z.infer<typeof createEventSchema>
) => {
  const res = await client.post<BaseResponse>(
    `${getApiUrl("action")}/events/store`,
    data,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return handleResponse(res);
};

export const deleteGroup = async (id: string) => {
  const res = await client.delete<BaseResponse<null>>(
    `${getApiUrl("action")}/cws/groups/${id}`
  );

  return handleResponse(res);
};

export const deleteEvent = async (id: string) => {
  const res = await client.get<BaseResponse<null>>(
    `${getApiUrl("action")}/event/delete/${id}`
  );

  return handleResponse(res);
};

export const postUpdateEvent = async (
  data: z.infer<typeof updateEventSchema>
) => {
  const res = await client.post<BaseResponse>(
    `${getApiUrl("action")}/events/store`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return handleResponse(res);
};
