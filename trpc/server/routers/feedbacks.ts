import {
  giveFeedbackSchema,
  numberIdSchema,
} from "@/validator/feedback.validator";
import { createTRPCRouter, protectedProcedure } from "..";

export const feedbackRoutes = createTRPCRouter({
  myFeedback: protectedProcedure()
    .input(numberIdSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.feedback.findUnique({
        where: { uid_articleId: { articleId: input.id, uid: ctx.userId } },
      });
    }),

  giveMyFeedback: protectedProcedure()
    .input(giveFeedbackSchema)
    .mutation(async ({ ctx, input: { articleId, type } }) => {
      const feedback = await ctx.db.feedback.upsert({
        where: {
          uid_articleId: {
            articleId,
            uid: ctx.userId,
          },
        },
        create: {
          type,
          articleId,
          uid: ctx.userId,
        },
        update: {
          type,
        },
      });

      await ctx.ai.giveFeedback({ articleId, type, uid: ctx.userId });

      return feedback;
    }),
});
