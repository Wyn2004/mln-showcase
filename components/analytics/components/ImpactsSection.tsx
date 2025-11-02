"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { impacts } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ImpactsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 px-8 py-4 border-4 border-red-600 bg-red-50 relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(220, 38, 38, 0.3)"
                }}>
                Tác Động của Quy Luật Giá Trị
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
            </div>
          </div>

          {/* Chart Image with Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            {/* Title Card */}
            <Card className="border-8 border-orange-600 bg-gradient-to-br from-orange-50 to-amber-50 mb-6"
              style={{ boxShadow: "8px 8px 0px rgba(234, 88, 12, 0.3)" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-orange-800 text-center mb-3"
                  style={{ fontFamily: "serif" }}>
                  Biểu Đồ Tác Động của Các Yếu Tố
                </h3>
                <p className="text-base text-gray-700 text-center" style={{ fontFamily: "serif" }}>
                  Biểu đồ so sánh mức độ ảnh hưởng của các yếu tố <strong>L</strong> (Lao động),
                  <strong> P</strong> (Phức tạp), <strong>D</strong> (Cường độ), <strong>Q</strong> (Năng suất)
                  đến lượng giá trị hàng hóa
                </p>
              </CardContent>
            </Card>

            <div className="border-8 border-orange-600 bg-white relative"
              style={{ boxShadow: "12px 12px 0px rgba(234, 88, 12, 0.4)" }}>
              <Image
                src="/images/analytics/anh3.png"
                alt="Biểu đồ so sánh tác động của các yếu tố L, P, D, Q"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Three Main Impacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-red-800 mb-8"
              style={{ fontFamily: "serif" }}>
              Ba Tác Động Cơ Bản
            </h3>

            <Accordion type="multiple" className="space-y-6">
              {impacts.map((impact, index) => {
                const colors = [
                  { bg: "bg-blue-50", border: "border-blue-600", text: "text-blue-800", accent: "bg-blue-100" },
                  { bg: "bg-green-50", border: "border-green-600", text: "text-green-800", accent: "bg-green-100" },
                  { bg: "bg-purple-50", border: "border-purple-600", text: "text-purple-800", accent: "bg-purple-100" }
                ];
                const color = colors[index];

                return (
                  <AccordionItem
                    key={index}
                    value={`impact-${index}`}
                    className={`border-4 ${color.border} ${color.bg} overflow-hidden`}
                    style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}
                  >
                    <AccordionTrigger
                      className={`px-6 md:px-8 py-6 hover:no-underline ${color.accent} hover:bg-opacity-70 transition-colors`}
                    >
                      <div className="flex items-center gap-4 text-left">
                        <span className="text-4xl">{impact.icon}</span>
                        <div>
                          <div className={`text-xl md:text-2xl font-bold ${color.text} mb-1`}
                            style={{ fontFamily: "serif" }}>
                            {index + 1}. {impact.title}
                          </div>
                          <p className="text-sm text-gray-600">
                            Click để xem chi tiết
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 md:px-8 py-6 bg-white">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Description */}
                        <div className={`${color.bg} border-l-4 ${color.border} p-4`}>
                          <p className="text-gray-800 text-lg leading-relaxed" style={{ fontFamily: "serif" }}>
                            {impact.description}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-3">
                          <h4 className={`font-bold ${color.text} text-lg`} style={{ fontFamily: "serif" }}>
                            Chi tiết:
                          </h4>
                          {impact.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border-l-2 border-gray-400"
                            >
                              <span className={`${color.text} font-bold text-lg`}>•</span>
                              <p className="text-gray-800 flex-1" style={{ fontFamily: "serif" }}>
                                {detail}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

