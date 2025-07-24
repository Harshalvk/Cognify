import { FeedbackType } from "@prisma/client";
import { z } from "zod";

export const giveFeedbackSchema = z.object({
  articleId: z.number(),
  type: z.enum(FeedbackType),
});

export const numberIdSchema = z.object({
  id: z.number(),
});
