"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

// export default function ChatInput({
//   handleNewMessage,
// }: {
//   handleNewMessage: (message: string) => void;
// }) {
export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  function handleSubmit() {
    const messageText = message.trim();

    setIsEmpty(true);
    setMessage("");

    // handleNewMessage(messageText);
  }

  return (
    <form className="relative flex w-[35vw] items-center" action={handleSubmit}>
      <Input
        placeholder="Message Brainwave"
        className="bg-secondary rounded-full pl-5 py-7 w-full"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setIsEmpty(e.target.value === "");
        }}
        onSubmit={handleSubmit}
        style={{
          viewTransitionName: "chat-input",
        }}
      />
      <Button
        className="rounded-full -ml-12 !p-0"
        type="submit"
        size="icon"
        disabled={isEmpty}
        style={{
          viewTransitionName: "chat-icon",
        }}
      >
        <ArrowUp strokeWidth={4} />
      </Button>
    </form>
  );
}
