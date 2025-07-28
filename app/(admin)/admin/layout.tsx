import TellThem from "@/components/TellThem";
import { auth } from "@/lib/auth";
import { trpcServer } from "@/trpc/clients/server";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <Link href={"/sign-in"}>Sign In</Link>;
  }

  const adminMe = await trpcServer.admins.adminMe.query();
  if (!adminMe) {
    return <TellThem role="admin" uid={session.user.id} />;
  }

  return children;
}
