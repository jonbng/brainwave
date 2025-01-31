"use client";

import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { redirect, useSearchParams } from "next/navigation";
import { CreateChat } from "./newChatAction";
import { Message } from "ai";
import { Suspense } from "react";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) {
    return redirect("/c");
  }

  CreateChat(message).then((url) => {
    redirect(url);
  });

  const messages: Message[] = [
    {
      content: message,
      role: "user",
      createdAt: new Date(),
      id: "1",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput handleSubmit={() => { }} input="" isLoading={true} handleInputChange={(e) => {}} />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
