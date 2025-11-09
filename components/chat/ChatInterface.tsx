"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Plus,
  Trash2,
  Loader2,
  Bot,
  User,
  MessageSquare,
} from "lucide-react";
import {
  createSession,
  getAllSessions,
  getMessages,
  saveMessage,
  deleteSession,
  type ChatMessage,
  type ChatSession,
} from "@/lib/idb/chatIdb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      loadMessages(currentSessionId);
    }
  }, [currentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

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

      // Lấy lịch sử 10 tin nhắn gần nhất để gửi cho AI
      const currentMessages = await getMessages(sessionId);
      const recentHistory = currentMessages.slice(-10).map((msg) => ({
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-700">
        <div className="p-3">
          <Button
            onClick={handleNewChat}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white justify-start"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Chat mới
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors",
                  currentSessionId === session.id && "bg-gray-800"
                )}
                onClick={() => setCurrentSessionId(session.id)}
              >
                <MessageSquare className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="text-sm truncate flex-1">{session.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            Trợ lý Kinh tế Chính trị ML
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Trợ lý Kinh tế Chính trị Mác - Lênin
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Hãy đặt câu hỏi về kinh tế chính trị, giá trị, hàng hóa, lao
                  động, tư bản... để bắt đầu
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-4 mb-6",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-blue-500 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none resize-none max-h-[200px] min-h-[52px]"
                disabled={isLoading}
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="m-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Nhấn Enter để gửi, Shift + Enter để xuống dòng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
