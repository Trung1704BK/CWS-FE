import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { z } from "zod";



interface CreateGroupResponse {
  name: string;
  name_en: string;
  username: string;
  country: string;
  avatar: string;
  cover: string;
  id: string;
  desc_vn: string;
  desc_en: string;
  status: string;
}
export interface Group {
  id: string;
  name: string;
  name_en: string;
  username: string;
  country: string;
  desc_vn: string;
  desc_en: string;
  avatar_url: string;
  headline: string;
  cover_url: string;
  site_url: string;
  twitter_url: string;
  telegram_url: string;
  facebook_url: string;
  youtube_url: string;
  discord_url: string;
  instagram_url?: any;
  status: number;
  status_label: string;
  total_user: number;
}

export const createGroupSchema = z.object({
  name: z.string().min(1).max(255),
  name_en: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  avatar: z.custom<File>(),
  cover: z.custom<File>(),
  desc_vn: z.string().min(1).max(255),
  desc_en: z.string().min(1).max(255),
  status: z.enum(["0", "1"]),
});
export const updateGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  name_en: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  avatar: z.custom<File | string>().optional(),
  cover: z.custom<File | string>().optional(),
  desc_vn: z.string().min(1).max(255),
  desc_en: z.string().min(1).max(255),
  status: z.enum(["0", "1"]),
});
export const postCreateGroup = async (
  data: z.infer<typeof createGroupSchema>
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("name_en", data.name_en);
  formData.append("username", data.username);
  formData.append("country", data.country);
  formData.append("avatar", data.avatar, data.avatar.name);
  formData.append("cover", data.cover, data.cover.name);
  formData.append("desc_vn", data.desc_vn);
  formData.append("desc_en", data.desc_en);
  formData.append("status", data.status);

  const res = await client.post<BaseResponse<CreateGroupResponse>>(
    `${getApiUrl("action")}/cws/groups`,
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

//
export const postUpdateGroup = async (
  data: z.infer<typeof updateGroupSchema>
) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "avatar" || key === "cover") {
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

  const res = await client.post<BaseResponse<CreateGroupResponse>>(
    `${getApiUrl("action")}/cws/groups`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return handleResponse(res);
};
//