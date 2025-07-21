import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Role } from "@/util/types";
import { authroizeUser } from "./util";
import { AIService } from "@/ai/ai.service";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ai = new AIService();

  return {
    db: prisma,
    session,
    ai,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = (...roles: Role[]) =>
  t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Sign in to access this data.",
      });
    }

    await authroizeUser(ctx.session.user.id, roles);

    return next({ ctx: { ...ctx, userId: ctx.session.user.id } });
  });
