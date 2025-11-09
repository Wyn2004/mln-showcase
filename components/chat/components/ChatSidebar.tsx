"use client";

import { Bot, Plus, Trash2, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ChatSession } from "@/lib/idb/chatIdb";

interface ChatSidebarProps {
  sidebarOpen: boolean;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export default function ChatSidebar({
  sidebarOpen,
  sessions,
  currentSessionId,
  onToggleSidebar,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        "bg-[#130E07]/95 backdrop-blur-sm border-r-2 border-amber-700/30 flex flex-col transition-all duration-300 absolute md:relative z-20 h-full overflow-hidden",
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
                <h2 className="text-lg font-bold text-amber-100">Trợ Lý AI</h2>
                <p className="text-xs text-amber-300/70">
                  Kinh Tế Chính Trị ML
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Button
              onClick={onNewChat}
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
            onClick={onToggleSidebar}
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
                    onClick={() => onSelectSession(session.id)}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 text-amber-400/80" />
                    <span className="text-sm truncate flex-1 text-amber-100/90">
                      {session.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
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
  );
}
