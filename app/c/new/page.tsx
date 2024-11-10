"use client";

import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { redirect } from "next/navigation";
import { CreateChat } from "./newChatAction";
import { useTransitionRouter } from "next-view-transitions";
import { Message } from "ai";

export default function ChatPage({ searchParams }: { searchParams: { message: string } }) {
  const { message } = searchParams;
  const router = useTransitionRouter();

  if (!message) {
    return redirect("/c");
  }

  CreateChat(message).then((url) => {
    router.push(url);
  });

  const messages: Message[] = [
    {
      content: message,
      role: "user",
      createdAt: new Date(),
      id: "1",
    },
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput handleSubmit={() => { }} input="" isLoading={true} handleInputChange={(e) => {}} />
      </div>
    </div>
  );
}
