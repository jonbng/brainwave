"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import UserAvatar from "./user-avatar";
import { signOutAction } from "@/app/actions";

export default function UserAvatarButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="rounded-2xl p-2 gap-1 flex flex-col"
      >
        <DropdownMenuItem className="rounded-lg p-3 m-0.5">
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem className="rounded-lg p-3 m-0.5" onSelect={() => signOutAction()}>
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
