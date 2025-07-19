import { createTRPCContext } from "@/trpc/server";
import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/server/routers";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });
};

export { handler as GET, handler as POST };
