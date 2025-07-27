import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { articleRoutes } from "./articles";
import { credtiBalanceRoutes } from "./creditBalance";
import { feedbackRoutes } from "./feedbacks";
import { reporterRoutes } from "./reporters";
import { stripRoutes } from "./stripe";

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articleRoutes,
  feedbacks: feedbackRoutes,
  creditBalance: credtiBalanceRoutes,
  stripe: stripRoutes,
});

export type AppRouter = typeof appRouter;
