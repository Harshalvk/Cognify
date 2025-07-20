import { ModeToggle } from "@/components/ModeToggle";
import ReporterSidebar from "@/components/ReporterSidebar";
import TellThem from "@/components/TellThem";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { trpcServer } from "@/trpc/clients/server";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ReporterLayout({
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

  const adminMe = await trpcServer.reporters.reporterMe.query();
  if (!adminMe) {
    return <TellThem role="reporter" uid={session.user.id} />;
  }

  return (
    <SidebarProvider>
      <ReporterSidebar />
      <section className="bg-sidebar w-full p-2">
        <div className="bg-background rounded-2xl h-full border">
          <div className="w-full h-fit items-center p-2 justify-between flex">
            <SidebarTrigger />
            <ModeToggle />
          </div>
          <Separator />
          {children}
        </div>
      </section>
    </SidebarProvider>
  );
}
