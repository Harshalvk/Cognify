import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { articleRoutes } from "./articles";
import { feedbackRoutes } from "./feedbacks";
import { reporterRoutes } from "./reporters";

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articleRoutes,
  feedbacks: feedbackRoutes,
});

export type AppRouter = typeof appRouter;
