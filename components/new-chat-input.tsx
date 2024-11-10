"use client";

import { useTransitionRouter } from "next-view-transitions";
import ChatInput from "./chat-input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NewChatInput({ chatId }: { chatId: number }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useTransitionRouter();
  const supabase = createClient();

  function handleSubmit() {
    const messageText = input.trim();
    if (!messageText) {
      return;
    }
    setInput("");
    setIsLoading(true);

    if (chatId) {
      supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          content: messageText,
          isUsers: true,
        })
        .then((response) => {
          if (response.error) {
            console.error("Failed to add message to chat");
            console.error(response.error);
          }
          router.refresh();
        });
    } else {
      router.push("/c/new?message=" + encodeURIComponent(messageText));
    }
  }

  return <ChatInput handleSubmit={handleSubmit} input={input} handleInputChange={(e) => setInput(e.target.value)} isLoading={isLoading} />;
}