import { z } from "zod";

export const userSignUpFormSchema = z.object({
  name: z.string().min(2).max(16),
  email: z.string(),
  password: z.string().min(2).max(32),
});

export const userSignInFormSchema = z.object({
  email: z.string(),
  password: z.string().min(2).max(32),
});
