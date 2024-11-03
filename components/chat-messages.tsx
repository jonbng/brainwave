import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import UserAvatar from "./user-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface ChatMessage {
  id: string;
  content: string;
  isMine: boolean;
  timeSent: Date;
}

export default function ChatMessages({
  messages,
}: {
  messages: ChatMessage[];
}) {
  // Sort messages by date
  messages.sort((a, b) => a.timeSent.getTime() - b.timeSent.getTime());

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4">
            {/* {!message.isMine && <div className="w-12" />} */}
            {message.isMine && <UserAvatar />}
            {!message.isMine && (
              <Avatar>
                <AvatarImage
                  src="/brainwave-avatar.jpg"
                  alt="Brainwave Avatar"
                />
                <AvatarFallback>BW</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-2 flex-1">
              <div className="font-semibold">
                {message.isMine ? "You" : "Brainwave"}
              </div>
              <div className="prose dark:prose-invert">
                {message.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {!message.isMine && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
