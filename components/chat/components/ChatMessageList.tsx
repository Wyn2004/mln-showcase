"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatEmptyState from "./ChatEmptyState";
import ChatLoadingIndicator from "./ChatLoadingIndicator";
import { SCROLL_DELAY_MS } from "@/components/chat/constants/chat";
import type { ChatMessage as ChatMessageType } from "@/lib/idb/chatIdb";

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current && scrollContainerRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, SCROLL_DELAY_MS);

    return () => clearTimeout(timer);
  }, [messages.length, isLoading, messagesEndRef]);

  const handleWheel = (e: React.WheelEvent) => {
    // Ensure wheel events are handled by this container
    e.stopPropagation();
  };

  return (
    <div
      ref={scrollContainerRef}
      className="chat-message-list flex-1 overflow-y-auto overflow-x-hidden min-h-0"
      onWheel={handleWheel}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {messages.length === 0 && <ChatEmptyState />}

        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isLoading && <ChatLoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
