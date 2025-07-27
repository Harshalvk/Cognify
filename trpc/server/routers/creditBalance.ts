import { createTRPCRouter, protectedProcedure } from "..";

export const credtiBalanceRoutes = createTRPCRouter({
  myCreditBalance: protectedProcedure().query(({ ctx }) => {
    return ctx.db.creditBalance.findUnique({ where: { userId: ctx.userId } });
  }),
});
