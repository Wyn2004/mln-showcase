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
  Menu,
  X,
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex h-screen bg-[#0a0604] overflow-hidden relative">
      {/* Sidebar - Collapsible */}
      <div
        className={cn(
          "bg-[#130E07]/95 backdrop-blur-sm border-r-2 border-amber-700/30 flex flex-col transition-all duration-300 absolute md:relative z-20 h-full",
          sidebarOpen
            ? "w-72 translate-x-0"
            : "w-0 -translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "p-4 border-b-2 border-amber-700/30 transition-all",
            !sidebarOpen && "md:p-2"
          )}
        >
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50">
                  <Bot className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-amber-100">
                    Trợ Lý AI
                  </h2>
                  <p className="text-xs text-amber-300/70">
                    Kinh Tế Chính Trị ML
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <Button
                onClick={handleNewChat}
                className="w-full bg-amber-700/80 hover:bg-amber-600 text-amber-50 border border-amber-600/50 transition-all"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo Chat Mới
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="w-full text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Sessions List */}
        {sidebarOpen && (
          <>
            <ScrollArea className="flex-1 px-3 py-2">
              <div className="space-y-1.5">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <MessageSquare className="w-12 h-12 text-amber-700/50 mx-auto mb-3" />
                    <p className="text-sm text-amber-300/60">
                      Chưa có cuộc trò chuyện nào
                    </p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className={cn(
                        "group flex items-center gap-2.5 p-3 rounded-lg cursor-pointer transition-all border",
                        currentSessionId === session.id
                          ? "bg-amber-700/40 border-amber-600/60 shadow-lg"
                          : "bg-[#1a1208]/60 border-amber-700/20 hover:bg-amber-700/20 hover:border-amber-600/40"
                      )}
                      onClick={() => setCurrentSessionId(session.id)}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0 text-amber-400/80" />
                      <span className="text-sm truncate flex-1 text-amber-100/90">
                        {session.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-900/50 rounded border border-transparent hover:border-red-700/50"
                        title="Xóa chat"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-amber-400/80 hover:text-red-400" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t-2 border-amber-700/30">
              <div className="text-xs text-amber-300/50 text-center leading-relaxed">
                Tổng:{" "}
                <span className="text-amber-400 font-semibold">
                  {sessions.length}
                </span>{" "}
                cuộc trò chuyện
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-linear-to-br from-[#0a0604] via-[#130E07] to-[#0a0604]">
        {/* Header with toggle button for mobile */}
        {!sidebarOpen && (
          <div className="md:hidden p-4 border-b border-amber-700/30">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-24">
                <div className="w-20 h-20 bg-amber-700/20 rounded-full flex items-center justify-center mb-6 border-2 border-amber-600/40 shadow-2xl">
                  <Bot className="w-10 h-10 text-amber-400" />
                </div>
                <h2
                  className="text-3xl font-bold mb-3 text-amber-100"
                  style={{ fontFamily: "serif" }}
                >
                  Trợ Lý Kinh Tế Chính Trị Mác - Lênin
                </h2>
                <p className="text-amber-200/70 max-w-xl text-lg leading-relaxed">
                  Hãy đặt câu hỏi về giá trị, hàng hóa, lao động, tư bản, chủ
                  nghĩa, giai cấp, sản xuất, thặng dư, phân phối thu nhập...
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-9 h-9 bg-amber-700/40 rounded-full flex items-center justify-center shrink-0 border-2 border-amber-600/50 shadow-lg mt-1">
                    <Bot className="w-5 h-5 text-amber-300" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-5 py-3.5 shadow-xl border-2",
                    message.role === "user"
                      ? "bg-amber-700/70 text-amber-50 border-amber-600/60 backdrop-blur-sm"
                      : "bg-[#1a1208]/80 text-amber-100 border-amber-700/30 backdrop-blur-md prose prose-invert prose-amber max-w-none"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="text-[15px] leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 ml-4 list-disc">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 ml-4 list-decimal">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-amber-50 font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="text-amber-200/90">{children}</em>
                          ),
                          code: ({ children }) => (
                            <code className="bg-amber-900/30 px-1.5 py-0.5 rounded text-amber-200 text-sm">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-amber-900/30 p-3 rounded-lg overflow-x-auto mb-3">
                              {children}
                            </pre>
                          ),
                          h1: ({ children }) => (
                            <h1 className="text-xl font-bold mb-3 text-amber-50">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-bold mb-2 text-amber-50">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-semibold mb-2 text-amber-100">
                              {children}
                            </h3>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-amber-700/50 pl-4 italic text-amber-200/80 my-3">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                      {message.content}
                    </p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-9 h-9 bg-amber-600/60 rounded-full flex items-center justify-center shrink-0 border-2 border-amber-500/70 shadow-lg mt-1">
                    <User className="w-5 h-5 text-amber-100" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 mb-6 animate-in fade-in duration-300">
                <div className="w-9 h-9 bg-amber-700/40 rounded-full flex items-center justify-center shrink-0 border-2 border-amber-600/50">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div className="bg-[#1a1208]/80 border-2 border-amber-700/30 rounded-2xl px-5 py-3.5 backdrop-blur-md">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t-2 border-amber-700/30 bg-[#130E07]/90 backdrop-blur-md p-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-3 bg-[#1a1208]/60 rounded-2xl border-2 border-amber-700/40 focus-within:border-amber-600/70 transition-all shadow-2xl backdrop-blur-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn về Kinh Tế Chính Trị..."
                className="flex-1 bg-transparent px-5 py-4 text-amber-100 placeholder-amber-400/50 focus:outline-none resize-none max-h-[200px] min-h-14"
                disabled={isLoading}
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="m-2.5 bg-amber-700/80 hover:bg-amber-600 text-amber-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed border border-amber-600/50 shadow-lg transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-amber-300/50 text-center mt-3">
              Nhấn{" "}
              <kbd className="px-1.5 py-0.5 bg-amber-900/40 border border-amber-700/40 rounded text-amber-300">
                Enter
              </kbd>{" "}
              để gửi,
              <kbd className="px-1.5 py-0.5 bg-amber-900/40 border border-amber-700/40 rounded text-amber-300 ml-1">
                Shift + Enter
              </kbd>{" "}
              để xuống dòng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
