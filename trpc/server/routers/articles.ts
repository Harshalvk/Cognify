import { createArticleSchema } from "@/validator/article.validator";
import { createTRPCRouter, protectedProcedure } from "..";
import { z } from "zod";
import { fetchAndScoreRelatedArticles } from "./shared/articles";
import { numberIdSchema } from "@/validator/feedback.validator";

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

  update: protectedProcedure("admin", "reporter")
    .input(
      z.object({ articleId: z.number(), articleData: createArticleSchema }),
    )
    .mutation(async ({ ctx, input }) => {
      const summaryLength = 200;
      const summary = input.articleData.body.substring(0, summaryLength);

      const article = await ctx.db.article.update({
        where: { id: input.articleId },
        data: {
          ...input.articleData,
          summary,
          Reporter: { connect: { id: ctx.userId } },
        },
      });

      await ctx.ai.updateArticle(article.id, article.published);
    }),

  getArticleById: protectedProcedure("admin", "reporter")
    .input(z.object({ articleId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.article.findUnique({
        where: {
          id: input.articleId,
        },
      });
    }),

  userRecommendations: protectedProcedure().query(async ({ ctx }) => {
    const { ai, db, userId } = ctx;
    return fetchAndScoreRelatedArticles({ ai, db, id: userId });
  }),

  moreLikeThis: protectedProcedure()
    .input(numberIdSchema)
    .query(async ({ ctx, input: { id } }) => {
      const { ai, db } = ctx;
      return fetchAndScoreRelatedArticles({ ai, db, id: id.toString() });
    }),
});
