import { createTRPCRouter } from "..";
import { adminRoutes } from "./admins";
import { reporterRoutes } from "./reporters";

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
});

export type AppRouter = typeof appRouter;
