"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { comparisonData } from "../data/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComparisonTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(220, 38, 38, 0.1) 20px,
            rgba(220, 38, 38, 0.1) 21px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-amber-50 mb-4 inline-block px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ 
                fontFamily: "serif",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
              }}>
              SO SÁNH CỤ THỂ
            </motion.h2>
            <p className="text-xl text-amber-100 mt-6 flex items-center justify-center gap-2" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
              <Sparkles className="w-5 h-5 text-amber-300" />
              Nhấn vào <Info className="w-4 h-4 inline text-amber-300" /> để xem chi tiết, hover để xem thông tin nhanh
              <Sparkles className="w-5 h-5 text-amber-300" />
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm"
                 style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#1a1208]/80 text-amber-50 border-b-2 border-amber-700/50">
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-2 border-amber-700/50"
                     style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  TIÊU CHÍ
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-2 border-amber-700/50 bg-[#1a1208]/60"
                     style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  TƯ BẢN CHỦ NGHĨA
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center bg-[#1a1208]/60"
                     style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  XÃ HỘI CHỦ NGHĨA
                </div>
              </div>

              {/* Table Body */}
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-3 border-b-2 border-amber-700/30 ${
                    index % 2 === 0 ? "bg-[#130E07]/60" : "bg-[#130E07]/70"
                  } ${selectedRow === index ? "ring-2 ring-amber-500" : ""} hover:bg-[#1a1208]/60 transition-all`}
                  onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                >
                  {/* Criteria */}
                  <div className="p-4 md:p-6 font-bold text-amber-100 border-r-2 border-amber-700/30 flex items-center justify-between"
                       style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl text-amber-300">{row.icon}</span>
                      <span>{row.criteria}</span>
                    </div>
                    {row.details && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="ml-2 p-2 hover:bg-amber-800/50 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Info className="w-5 h-5 text-amber-300" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl border-2 border-amber-600/50 bg-[#130E07]/95 backdrop-blur-sm"
                                       style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)" }}>
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-amber-50 flex items-center gap-3 mb-4"
                                         style={{ fontFamily: "serif", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                              <span className="text-5xl text-amber-300">{row.icon}</span>
                              {row.criteria}
                            </DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed text-amber-100 bg-[#1a1208]/60 p-6 border border-amber-700/30 rounded-lg"
                                               style={{ 
                                                 fontFamily: "serif", 
                                                 textAlign: "justify",
                                                 boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)"
                                               }}>
                              {row.details}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <motion.div 
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-[#1a1208]/60 border border-amber-700/30 p-6"
                              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                              <h4 className="font-bold text-amber-200 mb-3 text-xl flex items-center gap-2"
                                  style={{ fontFamily: "serif" }}>
                                <span className="text-amber-400 text-2xl">●</span>
                                Tư Bản Chủ Nghĩa
                              </h4>
                              <p className="text-base leading-relaxed text-amber-100" style={{ fontFamily: "serif" }}>{row.capitalism}</p>
                            </motion.div>
                            <motion.div 
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="bg-[#1a1208]/60 border border-amber-700/30 p-6"
                              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                              <h4 className="font-bold text-amber-200 mb-3 text-xl flex items-center gap-2"
                                  style={{ fontFamily: "serif" }}>
                                <span className="text-amber-300 text-2xl">★</span>
                                Xã Hội Chủ Nghĩa
                              </h4>
                              <p className="text-base leading-relaxed text-amber-100" style={{ fontFamily: "serif" }}>{row.socialism}</p>
                            </motion.div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                    {/* Capitalism */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="p-4 md:p-6 text-amber-100 border-r-2 border-amber-700/30 flex items-center cursor-help"
                           style={{ fontFamily: "serif" }}>
                        <div className="w-full">
                          <div className="flex items-start">
                            <span className="text-amber-400 mr-2 mt-1 text-xl">●</span>
                            <span>{row.capitalism}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 border-2 border-amber-600/50 bg-[#130E07]/95 backdrop-blur-sm"
                                      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)" }}>
                      <div className="space-y-2">
                        <h4 className="font-bold text-amber-200 text-lg flex items-center gap-2" style={{ fontFamily: "serif" }}>
                          <span className="text-amber-400">●</span>
                          Tư Bản Chủ Nghĩa
                        </h4>
                        <p className="text-sm text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                          {row.capitalism}
                        </p>
                        <div className="pt-2 border-t-2 border-amber-700/30">
                          <p className="text-xs text-amber-300/80 italic">Nhấn vào icon ℹ️ để xem chi tiết</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                    {/* Socialism */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="p-4 md:p-6 text-amber-100 flex items-center cursor-help"
                           style={{ fontFamily: "serif" }}>
                        <div className="w-full">
                          <div className="flex items-start">
                            <span className="text-amber-300 mr-2 mt-1 text-xl">★</span>
                            <span>{row.socialism}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 border-2 border-amber-600/50 bg-[#130E07]/95 backdrop-blur-sm"
                                      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)" }}>
                      <div className="space-y-2">
                        <h4 className="font-bold text-amber-200 text-lg flex items-center gap-2" style={{ fontFamily: "serif" }}>
                          <span className="text-amber-300">★</span>
                          Xã Hội Chủ Nghĩa
                        </h4>
                        <p className="text-sm text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                          {row.socialism}
                        </p>
                        <div className="pt-2 border-t-2 border-amber-700/30">
                          <p className="text-xs text-amber-300/80 italic">Nhấn vào icon ℹ️ để xem chi tiết</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-600/50 p-8 text-center"
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}
          >
            <p className="text-xl md:text-2xl text-amber-100 font-bold leading-relaxed"
               style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
              Nếu TBCN là <span className="text-amber-300">"đỉnh cao của chủ nghĩa bóc lột"</span>, 
              thì XHCN chính là <span className="text-amber-300">hình thái xã hội mới</span>, 
              nơi con người thoát khỏi sự tha hóa, phát triển toàn diện cả vật chất và tinh thần.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

