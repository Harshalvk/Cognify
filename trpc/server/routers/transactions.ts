import { createTRPCRouter, protectedProcedure } from "..";

export const transactionRoutes = createTRPCRouter({
  myTransactions: protectedProcedure().query(({ ctx }) => {
    return ctx.db.transaction.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
