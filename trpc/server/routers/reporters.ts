import { createUserSchema } from "@/validator/user.validator";
import { createTRPCRouter, protectedProcedure } from "..";
import { TRPCError } from "@trpc/server";

export const reporterRoutes = createTRPCRouter({
  reporterMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.reporter.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    });
  }),

  findAll: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.reporter.findMany({ include: { User: true } });
  }),

  create: protectedProcedure("admin")
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const reporter = await ctx.db.reporter.findUnique({
        where: input,
      });

      if (reporter) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "The user is already a reporter.",
        });
      }

      return ctx.db.reporter.create({ data: input });
    }),

  delete: protectedProcedure("admin")
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reporter.delete({ where: { id: input.id } });
    }),
});
