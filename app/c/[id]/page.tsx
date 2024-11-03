import ChatInput from "@/components/ChatInput";
import TypingAnimation from "@/components/ui/typing-animation";
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

  function handleNewMessage(message: string) {
    console.log(message);
  }

  return (
    <div className="w-full h-full flex">
      <div className="mt-auto flex gap-6 flex-col mb-8">
        <ChatInput />
      </div>
    </div>
  );
}
