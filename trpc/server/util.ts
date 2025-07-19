import { Role } from "@/util/types";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [adminExists, reporterExists] = await Promise.all([
    prisma.admin.findUnique({ where: { id } }),
    prisma.reporter.findUnique({ where: { id } }),
  ]);

  const roles: Role[] = [];

  if (adminExists) roles.push("admin");
  if (reporterExists) roles.push("reporter");

  return roles;
};

export const authroizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return;
  }

  const userRoles = await getUserRoles(uid);

  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not have the required role(s).",
    });
  }
};
