import { ModeToggle } from "@/components/ModeToggle";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <UserSidebar />
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
};

export default UserLayout;
