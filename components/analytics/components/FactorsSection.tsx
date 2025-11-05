"use client";

import { motion } from "framer-motion";
import { factors } from "../data/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FactorsSection() {

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
                Các Yếu Tố Cấu Thành (L, P, D, Q)
              </h2>
            </div>
          </div>

          {/* Factors Grid - Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {factors.map((factor, index) => {
              // const colors = getColorClasses(factor.color);
              return (
                <motion.div
                  key={factor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm hover:bg-[#1a1208]/90 transition-colors cursor-pointer"
                        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-amber-300 mb-2" style={{ fontFamily: "serif" }}>
                        {factor.symbol}
                      </div>
                      <div className="text-sm font-semibold text-amber-100">
                        {factor.name}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Detailed Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Accordion type="multiple" className="space-y-6">
              {factors.map((factor) => {
                return (
                  <AccordionItem
                    key={factor.id}
                    value={factor.id}
                    className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm overflow-hidden"
                    style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}
                  >
                    <AccordionTrigger
                      className="px-6 md:px-8 py-6 hover:no-underline text-amber-100 hover:text-amber-50 hover:bg-[#1a1208]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge className="text-xl font-bold bg-amber-600/50 text-amber-100 border border-amber-500/50 px-3 py-1"
                                   style={{ fontFamily: "serif" }}>
                              {factor.symbol}
                            </Badge>
                            <span className="text-xl md:text-2xl font-bold" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                              {factor.fullName}
                            </span>
                          </div>
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
                          <h4 className="font-bold text-amber-200 mb-2" style={{ fontFamily: "serif" }}>
                            Định nghĩa:
                          </h4>
                          <p className="text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                            {factor.description}
                          </p>
                        </div>

                        {/* Relationship */}
                        <div className="bg-[#130E07]/60 border-l-2 border-amber-600/50 p-4">
                          <h4 className="font-bold text-amber-200 mb-2" style={{ fontFamily: "serif" }}>
                            Quan hệ với giá trị:
                          </h4>
                          <p className="text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                            {factor.relationship}
                          </p>
                        </div>

                        {/* Examples */}
                        {factor.examples && factor.examples.length > 0 && (
                          <div className="bg-[#130E07]/60 border-l-2 border-amber-600/50 p-4">
                            <h4 className="font-bold text-amber-200 mb-2" style={{ fontFamily: "serif" }}>
                              Ví dụ:
                            </h4>
                            <ul className="space-y-1">
                              {factor.examples.map((example, idx) => (
                                <li key={idx} className="text-amber-100" style={{ fontFamily: "serif" }}>
                                  • {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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

