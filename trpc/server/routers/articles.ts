import { createArticleSchema } from "@/validator/article.validator";
import { createTRPCRouter, protectedProcedure } from "..";

export const articleRoutes = createTRPCRouter({
  create: protectedProcedure("admin", "reporter")
    .input(createArticleSchema)
    .mutation(async ({ ctx, input }) => {
      const summaryLength = 200;
      const summary = input.body.substring(0, summaryLength);

      const article = await ctx.db.article.create({
        data: { ...input, summary, Reporter: { connect: { id: ctx.userId } } },
      });

      await ctx.ai.upsertArticle({
        ...article,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      });

      return article;
    }),
});
