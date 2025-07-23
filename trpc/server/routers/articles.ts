import { createArticleSchema } from "@/validator/article.validator";
import { createTRPCRouter, protectedProcedure } from "..";
import { z } from "zod";

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
    const related = await ai.userRecommendations({ id: userId });

    const articleIds = related.map((article) => +article.id);

    const articles = await db.article.findMany({
      where: {
        id: {
          in: articleIds,
        },
      },
      select: {
        title: true,
        createdAt: true,
        id: true,
        tags: true,
        summary: true,
      },
    });

    type RelatedArticle = (typeof articles)[0];

    const articlesWithScores = related
      .map(({ id, score }) => {
        const article = articles.find((article) => article.id === +id);
        if (article) {
          return { score, article };
        }
      })
      .filter(
        (article): article is { article: RelatedArticle; score: number } =>
          !!article,
      );

    return articlesWithScores;
  }),
});
