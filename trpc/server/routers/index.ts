import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { articleRoutes } from "./articles";
import { credtiBalanceRoutes } from "./creditBalance";
import { editorRoutes } from "./editors";
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
  editors: editorRoutes,
});

export type AppRouter = typeof appRouter;
