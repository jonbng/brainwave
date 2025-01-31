import ChatUi from "@/components/chat-ui";
import { convertToUIMessages } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ isNew: string }>;
}) {
  const { id } = await params;
  const { isNew } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  } else if (!id) {
    return notFound();
  }

  const messages = (await supabase.from("messages").select().eq("chat_id", Number(id))).data;

  if (!messages || messages?.length === 0) {
    console.error("Failed to fetch messages");
    console.log(messages);
    return notFound();
  }

  return (
    <ChatUi
      id={Number(id)}
      initialMessages={convertToUIMessages(messages)}
      isNew={isNew === "yes"}
    />
  );
}
