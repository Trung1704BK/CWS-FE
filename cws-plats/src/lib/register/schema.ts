import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    name: z.string().min(2),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not  match",
    path: ["password_confirmation"],
  });
