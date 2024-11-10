"use server";

import { createClient } from "@/utils/supabase/server";

export async function CreateChat(message: string) {
  console.log("Creating chat with message:", message);

  if (!message) {
    return '/c';
  }

  const supabase = await createClient();

  const user = (await supabase.auth.getUser())?.data.user
  if (!user) {
    return '/c';
  }

  // Create a new chat
  const newChat = (await supabase.from("chats").insert({
    user_id: user.id,
    title: "New Chat",
  }).select().single());

  if (!newChat.data) {
    console.error("Failed to create new chat");
    console.error(newChat.error);
    return '/c';
  }

  // Add message to the chat
  const newMessage = await supabase.from("messages").insert({
    chat_id: newChat.data.id,
    content: message,
    isUsers: true
  });

  if (!newMessage.data && newMessage.error) {
    console.error("Failed to add message to chat");
    console.error(newMessage.error);
    return '/c';
  }

  // URL to redirect to after sign up process completes
  return `/c/${newChat.data.id}?isNew=yes`;
}
