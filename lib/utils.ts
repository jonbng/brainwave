import { Database } from "@/utils/supabase/database.types";
import { Message } from "ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToUIMessages(
  messages: Array<Database["public"]["Tables"]["messages"]["Row"]>
): Array<Message> {
  return messages.reduce((chatMessages: Array<Message>, message) => {
    const role: Message["role"] = message.isUsers ? 'user' : 'assistant';

    chatMessages.push({
      id: String(message.id),
      role: role,
      content: message.content,
    });

    return chatMessages;
  }, []);
}