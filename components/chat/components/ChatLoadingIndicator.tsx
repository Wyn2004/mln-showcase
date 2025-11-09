"use client";

import { Bot, Loader2 } from "lucide-react";

export default function ChatLoadingIndicator() {
  return (
    <div className="flex gap-4 mb-6 animate-in fade-in duration-300">
      <div className="w-9 h-9 bg-amber-700/40 rounded-full flex items-center justify-center shrink-0 border-2 border-amber-600/50">
        <Bot className="w-5 h-5 text-amber-300" />
      </div>
      <div className="bg-[#1a1208]/80 border-2 border-amber-700/30 rounded-2xl px-5 py-3.5 backdrop-blur-md">
        <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
      </div>
    </div>
  );
}
