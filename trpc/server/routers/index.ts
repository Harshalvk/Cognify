import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { articleRoutes } from "./articles";
import { reporterRoutes } from "./reporters";

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articleRoutes,
});

export type AppRouter = typeof appRouter;
