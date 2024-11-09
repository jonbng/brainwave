"use client";

import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { redirect } from "next/navigation";
import { CreateChat } from "./newChatAction";
import { Database } from "@/utils/supabase/database.types";
import { useTransitionRouter } from "next-view-transitions";

export default function ChatPage({ searchParams }: { searchParams: { message: string } }) {
  const { message } = searchParams;
  const router = useTransitionRouter();

  if (!message) {
    return redirect("/c");
  }

  CreateChat(message).then((url) => {
    router.push(url);
  });

  const messages: Database["public"]["Tables"]["messages"]["Row"][] = [
    {
      id: 1,
      chat_id: 1,
      content: message,
      isUsers: true,
      created_at: new Date().toISOString(),
    },
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput />
      </div>
    </div>
  );
}
