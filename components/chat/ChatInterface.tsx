"use client";

import { useState, useEffect, useRef } from "react";
import {
  createSession,
  getAllSessions,
  getMessages,
  saveMessage,
  deleteSession,
  type ChatMessage,
  type ChatSession,
} from "@/lib/idb/chatIdb";
import ChatSidebar from "./components/ChatSidebar";
import ChatMessageList from "./components/ChatMessageList";
import ChatInput from "./components/ChatInput";
import { MAX_HISTORY_MESSAGES } from "@/components/chat/constants/chat";

export default function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      loadMessages(currentSessionId);
    }
  }, [currentSessionId]);

  const loadSessions = async () => {
    const allSessions = await getAllSessions();
    setSessions(allSessions);
  };

  const loadMessages = async (sessionId: string) => {
    const sessionMessages = await getMessages(sessionId);
    setMessages(sessionMessages);
  };

  const handleNewChat = async () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInput("");
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
    await loadSessions();
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userQuestion = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      let sessionId = currentSessionId;

      // Tạo session mới nếu chưa có
      if (!sessionId) {
        sessionId = await createSession(userQuestion);
        setCurrentSessionId(sessionId);
        await loadSessions();
      }

      // Lưu tin nhắn user
      const userMessage: ChatMessage = {
        sessionId,
        role: "user",
        content: userQuestion,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      await saveMessage(userMessage);

      // Lấy history messages
      const currentMessages = await getMessages(sessionId);
      const recentHistory = currentMessages
        .slice(-MAX_HISTORY_MESSAGES)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      // Gọi API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userQuestion,
          history: recentHistory,
        }),
      });

      const data = await response.json();

      // Lưu tin nhắn assistant
      const assistantMessage: ChatMessage = {
        sessionId,
        role: "assistant",
        content: data.answer || data.error || "Đã xảy ra lỗi",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      await saveMessage(assistantMessage);
    } catch {
      const errorMessage: ChatMessage = {
        sessionId: currentSessionId!,
        role: "assistant",
        content: "Xin lỗi, đã xảy ra lỗi khi xử lý câu hỏi của bạn.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      await saveMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#0a0604] overflow-hidden relative">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={handleDeleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-linear-to-br from-[#0a0604] via-[#130E07] to-[#0a0604] min-w-0 overflow-hidden">
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          input={input}
          isLoading={isLoading}
          sidebarOpen={sidebarOpen}
          onInputChange={setInput}
          onSend={handleSendMessage}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
}
