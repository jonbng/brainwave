"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import UserAvatar from "./user-avatar";

export default function UserAvatarButton() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="rounded-2xl p-2 gap-1 flex flex-col"
      >
        <DropdownMenuItem>
          <Button className="w-full rounded-lg" variant="ghost">
            <Settings /> Settings
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem>
          <Button className="w-full rounded-lg" variant="ghost">
            <LogOut /> Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
