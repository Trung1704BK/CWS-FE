import { z } from "zod";
export const verifyNewCodeSchema = z.object({
  email: z.string().email(),
});
