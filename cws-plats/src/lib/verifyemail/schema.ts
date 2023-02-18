import { z } from "zod";
export const verifyEmailSchema = z.object({
  email: z.string().email(),
  confirmation_code: z.string(),
});

