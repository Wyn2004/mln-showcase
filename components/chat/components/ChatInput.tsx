"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  sidebarOpen: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onToggleSidebar: () => void;
}

export default function ChatInput({
  input,
  isLoading,
  sidebarOpen,
  onInputChange,
  onSend,
  onToggleSidebar,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      {!sidebarOpen && (
        <div className="md:hidden p-4 border-b border-amber-700/30">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t-2 border-amber-700/30 bg-[#130E07]/90 backdrop-blur-md p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3 bg-[#1a1208]/60 rounded-2xl border-2 border-amber-700/40 focus-within:border-amber-600/70 transition-all shadow-2xl backdrop-blur-sm">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn về Kinh Tế Chính Trị..."
              className="flex-1 bg-transparent px-5 py-4 text-amber-100 placeholder-amber-400/50 focus:outline-none resize-none max-h-[200px] min-h-14"
              disabled={isLoading}
              rows={1}
            />
            <Button
              onClick={onSend}
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
    </>
  );
}
