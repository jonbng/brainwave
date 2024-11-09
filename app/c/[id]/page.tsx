import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const messages = (await supabase.from("messages").select().eq("chat_id", id)).data;

  if (!messages || messages?.length === 0) {
    console.error("Failed to fetch messages");
    console.log(messages);
    return redirect("/c");
  } else {
    console.log("Messages:", messages);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages messages={messages} />
      <div className="mt-auto mx-auto flex gap-6 flex-col mb-8">
        <ChatInput />
      </div>
    </div>
  );
}
