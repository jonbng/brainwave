import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-messages";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ChatPage({ searchParams }: { searchParams: { message: string } }) {
  const { message } = searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const messages: ChatMessage[] = [
    {
      id: "2",
      content: message || "I need help with my order",
      isMine: true,
      timeSent: new Date(new Date().getTime() + 60 * 1000),
    },
    {
      id: "3",
      content: "HIIII!",
      isMine: false,
      timeSent: new Date(new Date().getTime() + 120 * 1000),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput />
      </div>
    </div>
  );
}
