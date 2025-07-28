import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { articleRoutes } from "./articles";
import { credtiBalanceRoutes } from "./creditBalance";
import { feedbackRoutes } from "./feedbacks";
import { reporterRoutes } from "./reporters";
import { stripRoutes } from "./stripe";
import { transactionRoutes } from "./transactions";

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articleRoutes,
  feedbacks: feedbackRoutes,
  creditBalance: credtiBalanceRoutes,
  stripe: stripRoutes,
  transactions: transactionRoutes,
});

export type AppRouter = typeof appRouter;
