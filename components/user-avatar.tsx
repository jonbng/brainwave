"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

export default function UserAvatar() {
  const [initials, setInitials] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);
  const supabase = createClient();

  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user) {
      console.log("auth state change");
      const user = session.user;
      const name = user.user_metadata.full_name;
      const avatar = user.user_metadata.avatar_url;
      const alt = user.user_metadata.alt;

      setInitials(
        name
          ? name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          : null
      );
      setAvatarUrl(avatar);
      setAlt(alt);
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        const name = user.user_metadata.full_name;
        const avatar = user.user_metadata.avatar_url;
        const alt = user.user_metadata.alt;

        setInitials(
          name
            ? name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
            : null
        );
        setAvatarUrl(avatar);
        setAlt(alt);

        console.log("fetched user");
        console.log(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex justify-center items-center cursor-pointer">
          <AvatarImage src={avatarUrl ?? ""} alt={alt ?? "User Avatar"} />
          <AvatarFallback className="bg-green-800">
            {initials ?? "??"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="rounded-2xl p-3"
      >
        <DropdownMenuItem className="rounded-xl">
          <Settings /> <button className="w-full rounded-sm">Settings</button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl">
          <LogOut /> <button className="w-full rounded-sm">Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
