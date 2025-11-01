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
    <section className="py-16 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
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
              className="text-4xl md:text-5xl font-bold text-red-800 mb-4 inline-block px-8 py-4 border-4 border-red-600 bg-yellow-100"
              style={{ 
                fontFamily: "serif",
                boxShadow: "8px 8px 0px rgba(220, 38, 38, 0.3)"
              }}>
              SO SÁNH CỤ THỂ
            </motion.h2>
            <p className="text-xl text-gray-700 mt-6 flex items-center justify-center gap-2" style={{ fontFamily: "serif" }}>
              <Sparkles className="w-5 h-5 text-yellow-600" />
              Nhấn vào <Info className="w-4 h-4 inline text-red-600" /> để xem chi tiết, hover để xem thông tin nhanh
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full border-8 border-red-800 bg-amber-50"
                 style={{ boxShadow: "16px 16px 0px rgba(153, 27, 27, 0.2)" }}>
              
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white border-b-4 border-red-900">
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-4 border-red-900"
                     style={{ fontFamily: "serif" }}>
                  TIÊU CHÍ
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-4 border-red-900 bg-red-800"
                     style={{ fontFamily: "serif" }}>
                  TƯ BẢN CHỦ NGHĨA
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center bg-red-900"
                     style={{ fontFamily: "serif" }}>
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
                  className={`grid grid-cols-3 border-b-4 border-red-800 ${
                    index % 2 === 0 ? "bg-amber-50" : "bg-yellow-50"
                  } ${selectedRow === index ? "ring-4 ring-red-500" : ""} hover:bg-yellow-100 transition-all`}
                  onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                >
                  {/* Criteria */}
                  <div className="p-4 md:p-6 font-bold text-red-900 border-r-4 border-red-800 flex items-center justify-between"
                       style={{ fontFamily: "serif" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{row.icon}</span>
                      <span>{row.criteria}</span>
                    </div>
                    {row.details && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="ml-2 p-2 hover:bg-red-200 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Info className="w-5 h-5 text-red-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl border-8 border-red-600 bg-amber-50"
                                       style={{ boxShadow: "12px 12px 0px rgba(220, 38, 38, 0.4)" }}>
                          <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-red-800 flex items-center gap-3 mb-4"
                                         style={{ fontFamily: "serif" }}>
                              <span className="text-5xl">{row.icon}</span>
                              {row.criteria}
                            </DialogTitle>
                            <DialogDescription className="text-lg leading-relaxed text-gray-800 bg-white p-6 border-4 border-red-600 rounded-lg"
                                               style={{ 
                                                 fontFamily: "serif", 
                                                 textAlign: "justify",
                                                 boxShadow: "4px 4px 0px rgba(220, 38, 38, 0.2)"
                                               }}>
                              {row.details}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <motion.div 
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-red-50 border-4 border-red-600 p-6"
                              style={{ boxShadow: "6px 6px 0px rgba(220, 38, 38, 0.2)" }}>
                              <h4 className="font-bold text-red-700 mb-3 text-xl flex items-center gap-2"
                                  style={{ fontFamily: "serif" }}>
                                <span className="text-red-500 text-2xl">●</span>
                                Tư Bản Chủ Nghĩa
                              </h4>
                              <p className="text-base leading-relaxed" style={{ fontFamily: "serif" }}>{row.capitalism}</p>
                            </motion.div>
                            <motion.div 
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="bg-yellow-50 border-4 border-yellow-600 p-6"
                              style={{ boxShadow: "6px 6px 0px rgba(161, 98, 7, 0.2)" }}>
                              <h4 className="font-bold text-yellow-700 mb-3 text-xl flex items-center gap-2"
                                  style={{ fontFamily: "serif" }}>
                                <span className="text-yellow-600 text-2xl">★</span>
                                Xã Hội Chủ Nghĩa
                              </h4>
                              <p className="text-base leading-relaxed" style={{ fontFamily: "serif" }}>{row.socialism}</p>
                            </motion.div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  {/* Capitalism */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="p-4 md:p-6 text-gray-800 border-r-4 border-red-800 flex items-center cursor-help"
                           style={{ fontFamily: "serif" }}>
                        <div className="w-full">
                          <div className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1 text-xl">●</span>
                            <span>{row.capitalism}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 border-4 border-red-600 bg-red-50"
                                      style={{ boxShadow: "6px 6px 0px rgba(220, 38, 38, 0.3)" }}>
                      <div className="space-y-2">
                        <h4 className="font-bold text-red-700 text-lg flex items-center gap-2" style={{ fontFamily: "serif" }}>
                          <span className="text-red-500">●</span>
                          Tư Bản Chủ Nghĩa
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "serif" }}>
                          {row.capitalism}
                        </p>
                        <div className="pt-2 border-t-2 border-red-300">
                          <p className="text-xs text-red-600 italic">Nhấn vào icon ℹ️ để xem chi tiết</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  {/* Socialism */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="p-4 md:p-6 text-gray-800 flex items-center cursor-help"
                           style={{ fontFamily: "serif" }}>
                        <div className="w-full">
                          <div className="flex items-start">
                            <span className="text-yellow-600 mr-2 mt-1 text-xl">★</span>
                            <span>{row.socialism}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 border-4 border-yellow-600 bg-yellow-50"
                                      style={{ boxShadow: "6px 6px 0px rgba(161, 98, 7, 0.3)" }}>
                      <div className="space-y-2">
                        <h4 className="font-bold text-yellow-700 text-lg flex items-center gap-2" style={{ fontFamily: "serif" }}>
                          <span className="text-yellow-600">★</span>
                          Xã Hội Chủ Nghĩa
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "serif" }}>
                          {row.socialism}
                        </p>
                        <div className="pt-2 border-t-2 border-yellow-300">
                          <p className="text-xs text-yellow-600 italic">Nhấn vào icon ℹ️ để xem chi tiết</p>
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
            className="mt-12 bg-gradient-to-r from-red-900 to-red-800 border-4 border-yellow-400 p-8 text-center"
            style={{ boxShadow: "12px 12px 0px rgba(202, 138, 4, 0.3)" }}
          >
            <p className="text-xl md:text-2xl text-yellow-100 font-bold leading-relaxed"
               style={{ fontFamily: "serif" }}>
              Nếu TBCN là <span className="text-yellow-300">"đỉnh cao của chủ nghĩa bóc lột"</span>, 
              thì XHCN chính là <span className="text-yellow-300">hình thái xã hội mới</span>, 
              nơi con người thoát khỏi sự tha hóa, phát triển toàn diện cả vật chất và tinh thần.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

