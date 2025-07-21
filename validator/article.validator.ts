import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string(),
  body: z.string(),
  published: z.boolean(),
  tags: z.array(z.string()),
});
