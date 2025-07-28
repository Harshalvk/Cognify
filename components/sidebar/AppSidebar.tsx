import {
  Edit,
  Home,
  MessageSquareShare,
  Newspaper,
  ShieldUser,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Admins",
    url: "/admin/manage-admins",
    icon: ShieldUser,
  },
  {
    title: "Reporters",
    url: "/admin/manage-reporters",
    icon: MessageSquareShare,
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User2,
  },
  {
    title: "Editors",
    url: "/admin/editors",
    icon: Edit,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
