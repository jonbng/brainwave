"use client";

import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import { Message, useChat } from "ai/react";
import { useTransitionRouter } from "next-view-transitions";
import { ChatRequestOptions } from "ai";
import { useEffect, useCallback, useMemo, useState } from "react";

export default function ChatPage({
  id,
  initialMessages,
  isNew = false,
}: {
  id: number;
  initialMessages?: Message[];
  isNew?: boolean;
}) {
  const supabase = createClient();
  const router = useTransitionRouter();
  const [hasRun, setHasRun] = useState(false);

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
    setInput,
    append,
    isLoading,
  } = useChat({
    body: { chat_id: id },
    initialMessages,
    onFinish: async (message) => {
      await supabase.from("messages").insert({
        content: message.content,
        chat_id: id,
        isUsers: message.role === "user",
      });
    },
  });

  const memoizedMessages = useMemo(() => messages, [messages]);

  const handleSubmitWithSave = useCallback(
    async (
      event?: {
        preventDefault?: () => void;
      },
      chatRequestOptions?: ChatRequestOptions
    ) => {
      await supabase.from("messages").insert({
        content: input,
        chat_id: id,
        isUsers: true,
      });

      handleSubmit(event, chatRequestOptions);
    },
    [input, id, supabase, handleSubmit]
  );

  useEffect(() => {
    if (isNew && !hasRun) {
      setHasRun(true);
      router.replace(`/c/${id}`);
      const hiddenMessage = "[hidden]";
      supabase.from("messages").insert({
        content: hiddenMessage,
        chat_id: id,
        isUsers: true,
      });
      setInput(hiddenMessage);
      append({ content: hiddenMessage, role: "user" });
    }
  }, [isNew, id, supabase, router, setInput, append, hasRun]);

  if (true) {
    console.log("Streaming data");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={memoizedMessages} />
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
