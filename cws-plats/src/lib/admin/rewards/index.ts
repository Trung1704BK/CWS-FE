import { getApiUrl } from "../../../core/client";
import client from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  status: z.enum(["0", "1"]),
  order: z.coerce.number().min(0),
  image: z.custom<File>(),
});

export const updateRewardSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  status: z.enum(["0", "1"]),
  order: z.number().min(0),
  image: z.custom<File | string>().optional(),
});

interface CreateRewardResponse {
  name: string;
  description: string;
  status: string;
  order: string;
  image: string;
  id: string;
  updated_at: string;
  created_at: string;
}

export interface AssetsResponse {
  current_page: number;
  data: Reward[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
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

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  type: number;
  region: number;
  start_at?: string;
  end_at?: string;
  order: number;
  status: number;
}

export const postCreateReward = async (
  data: z.infer<typeof createAssetSchema>
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("status", data.status);
  formData.append("image", data.image, data.image.name);
  formData.append("order", data.order.toString());

  const res = await client.post<BaseResponse<CreateRewardResponse>>(
    `${getApiUrl("action")}/rewards/store`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
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

export const deleteReward = async (id: string) => {
  const res = await client.get<BaseResponse<null>>(
    `${getApiUrl("action")}/rewards/delete/${id}`
  );

  return handleResponse(res);
};

export const postUpdateReward = async (
  data: z.infer<typeof updateRewardSchema>
) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "image") {
      if (!data[key]) continue;
      if (typeof data[key] === "string") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formData.append(key, data[key]);
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      formData.append(key, data[key], data[key]?.name);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data[key]) formData.append(key, data[key]);
    }
  }

  const res = await client.post<BaseResponse<CreateRewardResponse>>(
    `${getApiUrl("action")}/rewards/store`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return handleResponse(res);
};
