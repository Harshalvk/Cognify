import { auth } from "@/lib/auth";
import { initTRPC } from "@trpc/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  return {
    db: prisma,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
