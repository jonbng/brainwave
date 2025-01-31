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
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/utils/supabase/database.types";

export function AppSidebar() {
  const { state } = useSidebar();
  const supabase = createClient();
  const [today, setToday] = useState<
    Database["public"]["Tables"]["chats"]["Row"][]
  >([]);
  const [last7Days, setLast7Days] = useState<
    Database["public"]["Tables"]["chats"]["Row"][]
  >([]);
  const [last30Days, setLast30Days] = useState<
    Database["public"]["Tables"]["chats"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const chatResponse = await supabase.from("chats").select();
      if (chatResponse.error) {
        console.error("Failed to fetch chats");
        console.error(chatResponse.error);
        return;
      }
      const chats = chatResponse.data;

      setToday(
        chats.filter((chat) => {
          const createdAt = new Date(chat.created_at);
          const now = new Date();
          return now.getDate() === createdAt.getDate();
        })
      );

      setLast7Days(
        chats.filter((chat) => {
          const createdAt = new Date(chat.created_at);
          const now = new Date();
          const diff = now.getTime() - createdAt.getTime();
          return (
            diff < 7 * 24 * 60 * 60 * 1000 &&
            now.getDate() !== createdAt.getDate()
          );
        })
      );

      setLast30Days(
        chats.filter((chat) => {
          const createdAt = new Date(chat.created_at);
          const now = new Date();
          const diff = now.getTime() - createdAt.getTime();
          return (
            diff < 30 * 24 * 60 * 60 * 1000 && diff >= 7 * 24 * 60 * 60 * 1000
          );
        })
      );
      setLoading(false);
    };
    fetchData();
  }, []);

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
          {today.length === 0 &&
            last7Days.length === 0 &&
            last30Days.length === 0 &&
            !loading && (
              <div className="flex-1 p-4 text-center text-gray-400">
                No chats to show
              </div>
            )}
          {loading && (
            <div className="flex-1 p-4 text-center text-gray-400">Loading...</div>
          )}
          {(today.length > 0 ||
            last7Days.length > 0 ||
            last30Days.length > 0) && (
            <ScrollArea className="flex-1 p-4">
              {today.length > 0 && <NavGroup title="Today" items={today} />}
              {last7Days.length > 0 && (
                <NavGroup title="This week" items={last7Days} />
              )}
              {last30Days.length > 0 && (
                <NavGroup title="This month" items={last30Days} />
              )}
            </ScrollArea>
          )}
        </SidebarContent>
        <SidebarFooter className="flex flex-row">
          <form action={signOutAction} className="grow">
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
