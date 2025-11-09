"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage as ChatMessageType } from "@/lib/idb/chatIdb";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
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
                  <ol className="mb-3 ml-4 list-decimal">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
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
  );
}
