import z from "zod";

export const createUserSchema = z.object({
  id: z.string().min(1, { message: "User id is required" }),
});
