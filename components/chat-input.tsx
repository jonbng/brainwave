"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: {
  handleSubmit: () => void;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
}) {
  function handleEnter() {
    if (input.trim() === "") {
      return;
    }
    handleSubmit();
  }

  return (
    <div className="relative flex w-[35vw] items-center">
      <Input
        placeholder="Message Brainwave"
        className="bg-secondary rounded-full pl-5 py-7 w-full"
        value={input}
        onChange={handleInputChange}
        onSubmit={handleEnter}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
        style={{
          viewTransitionName: "chat-input",
        }}
      />
      <Button
        className="rounded-full -ml-12 p-0!"
        onClick={handleEnter}
        size="icon"
        disabled={isLoading}
        style={{
          viewTransitionName: "chat-icon",
        }}
      >
        <ArrowUp strokeWidth={4} />
      </Button>
    </div>
  );
}
