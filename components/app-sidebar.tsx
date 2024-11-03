"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import SidebarButtons from "./sidebar-buttons";
import { ThemeSwitcher } from "./theme-switcher";
import { signOutAction } from "@/app/actions";
import { ScrollArea } from "./ui/scroll-area";
import { NavGroup } from "./nav-main";

export function AppSidebar() {
  const { state } = useSidebar();

  const last24Hours = [
    {
      title: "School Project Ideas",
      href: "/c",
    }
  ];

  const last7Days = [
    {
      title: "Homebrew Cask Audit Error",
      href: "/c",
    },
    {
      title: "Drop Advice for Wii",
      href: "/c",
    }
  ];

  const last30Days = [
    {
      title: "Digital Ticket System Ideas",
      href: "/c",
    },
    {
      title: "Career Interests in Tech",
      href: "/c",
    }
  ];

  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex items-center justify-between w-full">
              <SidebarButtons />
            </div>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="flex-1 p-4">
            <NavGroup title="Today" items={last24Hours} />
            <NavGroup title="This week" items={last7Days} />
            <NavGroup title="This month" items={last30Days} />
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="flex flex-row">
          <form action={signOutAction} className="flex-grow">
            <Button variant="ghost" type="submit" className="w-full">
              Log out
            </Button>
          </form>
          <ThemeSwitcher />
        </SidebarFooter>
      </Sidebar>
      {state === "collapsed" && (
        <div className="mt-2 ml-2 flex justify-between gap-2 h-10">
          <SidebarButtons />
        </div>
      )}
    </>
  );
}
