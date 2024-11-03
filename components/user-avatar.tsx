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
import { Button } from "./ui/button";

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
        className="rounded-2xl p-2 gap-1 flex flex-col"
      >
        <DropdownMenuItem>
          <Button className="w-full rounded-lg" variant="ghost">
          <Settings />{" "}
            Settings
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1"/>
        <DropdownMenuItem>
          <Button className="w-full rounded-lg" variant="ghost">
          <LogOut />{" "}
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
