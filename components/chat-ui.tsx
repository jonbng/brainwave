"use client";

import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import { Message, useChat } from "ai/react";
import { useTransitionRouter } from "next-view-transitions";
import { ChatRequestOptions } from "ai";

export default function ChatPage({ id, initialMessages, isNew = false }: { id: number, initialMessages?: Message[], isNew?: boolean }) {
  const supabase = createClient();
  const router = useTransitionRouter();

  if (!id) {
    return notFound();
  }

  if (!initialMessages) {
    console.error("Failed to fetch messages");
    return notFound();
  }

  const {
    messages,
    handleSubmit,
    input,
    handleInputChange,
    isLoading
  } = useChat({
    body: { chat_id: id },
    initialMessages,
    onFinish: async (message) => {
      await supabase.from("messages").insert({
        content: message.content,
        chat_id: id,
        isUsers: message.role === "user"
      });
    },
  });

  async function handleSubmitWithSave(
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) {
    await supabase.from("messages").insert({
      content: input,
      chat_id: id,
      isUsers: true
    });

    handleSubmit(event, chatRequestOptions);
  }

  if (true) {
    console.log("Streaming data");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput
          handleSubmit={handleSubmitWithSave}
          input={input}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
