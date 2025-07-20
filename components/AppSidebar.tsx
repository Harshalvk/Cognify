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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Admins",
    url: "/admin",
    icon: ShieldUser,
  },
  {
    title: "Reporters",
    url: "/reporter",
    icon: MessageSquareShare,
  },
  {
    title: "Articles",
    url: "#",
    icon: Newspaper,
  },
  {
    title: "Users",
    url: "#",
    icon: User2,
  },
  {
    title: "Editors",
    url: "#",
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
