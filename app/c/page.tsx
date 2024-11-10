import NewChatInput from "@/components/new-chat-input";
import TypingAnimation from "@/components/ui/typing-animation";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
  }) {
  const { id } = await params;

  return (
    <div className="w-full h-full flex">
      <div className="my-auto mx-auto flex gap-6 flex-col">
        <TypingAnimation
          text="What can I help with?"
          duration={40}
          className="text-3xl"
        />
        <NewChatInput chatId={Number(id)} />
      </div>
    </div>
  );
}
