"use client";

import { Bot } from "lucide-react";

export default function ChatEmptyState() {
  return (
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
        Hãy đặt câu hỏi về giá trị, hàng hóa, lao động, tư bản, chủ nghĩa, giai
        cấp, sản xuất, thặng dư, phân phối thu nhập...
      </p>
    </div>
  );
}
