import { createUserSchema } from "@/validator/user.validator";
import { createTRPCRouter, protectedProcedure } from "..";
import { TRPCError } from "@trpc/server";

export const adminRoutes = createTRPCRouter({
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: {
        id: ctx.userId,
      },
      include: { User: true },
    });
  }),

  findAll: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.admin.findMany({
      include: {
        User: true,
      },
    });
  }),

  create: protectedProcedure("admin")
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: input });

      if (admin) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "The user is already an admin.",
        });
      }
      return ctx.db.admin.create({ data: input });
    }),

  delete: protectedProcedure("admin")
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.admin.delete({ where: { id: input.id } });
    }),
});
