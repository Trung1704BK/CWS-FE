import { z } from "zod";

const castToNumber = z.coerce.number();
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ZodFile = z.custom<File>();

export const createTaskSchema = z.object({
  base: z.object({
    name: z.string(),
    description: z.string(),
    order: castToNumber,
    status: castToNumber,
    group_id: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .min(1, { message: "At least one group is required" }),
  }),
  image: z.custom<File>(),
  slider: z.array(z.custom<File>()),
  locations: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      reward: z
        .object({
          value: z.string(),
          label: z.string(),
          imageUrl: z.string(),
        })
        .nullable(),
      amount: castToNumber,
      job_num: castToNumber,
      order: castToNumber,
      status: castToNumber,
      detail: z
        .array(
          z.object({
            name: z.string(),
            address: z.string(),
            lng: castToNumber,
            lat: castToNumber,
            sort: castToNumber,
          })
        )
        .min(1, { message: "At least one detail is required" }),
    })
  ),
  social: z.array(
    z.object({
      reward_id: z.string().min(1),
      type: castToNumber,
      url: z.string(),
      amount: castToNumber,
      platform: castToNumber,
    })
  ),
  events: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      type: castToNumber,
      max_job: castToNumber,
      status: castToNumber,
      banner_url: ZodFile,
      amount: castToNumber,
      reward: z.object({
        value: z.string(),
        label: z.string(),
        imageUrl: z.string(),
      }),
      details: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
            status: castToNumber,
          })
        )
        .default([]),
    })
  ),
});

type UrlOrFile = string | File;

export const editTaskSchema = z.object({
  base: z.object({
    name: z.string(),
    description: z.string(),
    order: castToNumber,
    status: castToNumber,
    group_id: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .min(1, { message: "At least one group is required" }),
  }),
  image: z.custom<UrlOrFile>(),
  slider: z.array(z.custom<UrlOrFile>()),
  locations: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      reward: z
        .object({
          value: z.string(),
          label: z.string(),
          imageUrl: z.string(),
        })
        .nullable(),
      amount: castToNumber,
      job_num: castToNumber,
      order: castToNumber,
      status: castToNumber,
      detail: z
        .array(
          z.object({
            name: z.string(),
            address: z.string(),
            lng: castToNumber,
            lat: castToNumber,
            sort: castToNumber,
          })
        )
        .min(1, { message: "At least one detail is required" }),
    })
  ),
  social: z.array(
    z.object({
      reward_id: z.string(),
      type: castToNumber,
      url: z.string(),
      amount: castToNumber,
      platform: castToNumber,
    })
  ),
});
