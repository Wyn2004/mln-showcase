"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { impacts } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ImpactsSection() {
  return (
    <section className="py-16">
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
              <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-4 px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
                style={{
                  fontFamily: "serif",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                }}>
                Tác Động của Quy Luật Giá Trị
              </h2>
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
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm mb-6"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-50 text-center mb-3"
                  style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Biểu Đồ Tác Động của Các Yếu Tố
                </h3>
                <p className="text-base text-amber-100/80 text-center" style={{ fontFamily: "serif" }}>
                  Biểu đồ so sánh mức độ ảnh hưởng của các yếu tố <strong className="text-amber-300">L</strong> (Lao động),
                  <strong className="text-amber-300"> P</strong> (Phức tạp), <strong className="text-amber-300">D</strong> (Cường độ), <strong className="text-amber-300">Q</strong> (Năng suất)
                  đến lượng giá trị hàng hóa
                </p>
              </CardContent>
            </Card>

            <div className="border-2 border-amber-600/50 bg-[#130E07]/60 relative rounded-lg overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
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
            <h3 className="text-2xl md:text-3xl font-bold text-center text-amber-50 mb-8"
              style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
              Ba Tác Động Cơ Bản
            </h3>

            <Accordion type="multiple" className="space-y-6">
              {impacts.map((impact, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={`impact-${index}`}
                    className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm overflow-hidden"
                    style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}
                  >
                    <AccordionTrigger
                      className="px-6 md:px-8 py-6 hover:no-underline text-amber-100 hover:text-amber-50 hover:bg-[#1a1208]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div>
                          <div className="text-xl md:text-2xl font-bold mb-1"
                            style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                            {index + 1}. {impact.title}
                          </div>
                          <p className="text-sm text-amber-200/70">
                            Click để xem chi tiết
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 md:px-8 py-6 bg-[#1a1208]/60">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Description */}
                        <div className="bg-[#130E07]/60 border-l-2 border-amber-600/50 p-4">
                          <p className="text-amber-100 text-lg leading-relaxed" style={{ fontFamily: "serif" }}>
                            {impact.description}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-amber-200 text-lg" style={{ fontFamily: "serif" }}>
                            Chi tiết:
                          </h4>
                          {impact.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 bg-[#130E07]/60 p-3 rounded-lg border-l-2 border-amber-600/50"
                            >
                              <span className="text-amber-300 font-bold text-lg">•</span>
                              <p className="text-amber-100 flex-1" style={{ fontFamily: "serif" }}>
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

