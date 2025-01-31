"use client";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { Database } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function NavGroup({
  title,
  items,
}: {
  title: string;
  items: Database["public"]["Tables"]["chats"]["Row"][];
}) {
  const { isMobile } = useSidebar();
  const supabase = createClient();
  const [chats, setChats] = useState<Database["public"]["Tables"]["chats"]["Row"][]>(items);

  return (
    <SidebarGroup title={title} className="px-0!">
      <SidebarGroupLabel className="px-0!">{title}</SidebarGroupLabel>
      <SidebarGroupContent className="px-0!">
        <SidebarMenu>
          {chats.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex">
                <Link href={`/c/${item.id}`} className="grow">
                  {item.title}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="ml-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    className="rounded-2xl p-3"
                  >
                    <DropdownMenuItem asChild>
                      <Button variant="ghost" className="w-full rounded-lg">
                        <Pencil className="mr-2" />
                        Rename
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="w-full text-destructive! rounded-lg hover:text-destructive!"
                        onClick={async () => {
                          const response = await supabase
                            .from("chats")
                            .delete()
                            .eq("id", item.id);
                          if (response.error) {
                            console.error("Failed to delete chat");
                            console.error(response.error);
                          } else {
                            // Remove the chat from the list
                            // This will trigger a re-render
                            setChats((prev) => prev.filter((chat) => chat.id !== item.id));
                          }
                        }}
                      >
                        <Trash className="mr-2" />
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
