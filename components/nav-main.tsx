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
import Link from "next/link";
import { Button } from "./ui/button";

export function NavGroup({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup title={title} className="!px-0">
      <SidebarGroupLabel className="!px-0">{title}</SidebarGroupLabel>
      <SidebarGroupContent className="!px-0">
        <SidebarMenu>
          {items.map((item, index) => (
            <DropdownMenu key={index}>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <Link href={item.href}>{item.title}</Link>{" "}
                    <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                  className="rounded-2xl p-3"
                >
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      className="w-full rounded-lg"
                    >
                      <Pencil className="mr-2" />
                      Rename
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      className="w-full !text-destructive rounded-lg hover:!text-destructive"
                    >
                      <Trash className="mr-2" />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </SidebarMenuItem>
            </DropdownMenu>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
