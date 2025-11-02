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
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      red: {
        bg: "bg-red-50",
        border: "border-red-600",
        text: "text-red-800",
        accent: "bg-red-100"
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-600",
        text: "text-blue-800",
        accent: "bg-blue-100"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-600",
        text: "text-orange-800",
        accent: "bg-orange-100"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-600",
        text: "text-green-800",
        accent: "bg-green-100"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
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
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4 px-8 py-4 border-4 border-indigo-600 bg-indigo-50 relative"
                  style={{ 
                    fontFamily: "serif",
                    boxShadow: "8px 8px 0px rgba(79, 70, 229, 0.3)"
                  }}>
                Các Yếu Tố Cấu Thành (L, P, D, Q)
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
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
              const colors = getColorClasses(factor.color);
              return (
                <motion.div
                  key={factor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-4 ${colors.border} ${colors.bg} hover:scale-105 transition-transform cursor-pointer`}
                        style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.2)" }}>
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">{factor.icon}</div>
                      <div className={`text-3xl font-bold ${colors.text} mb-2`} style={{ fontFamily: "serif" }}>
                        {factor.symbol}
                      </div>
                      <div className={`text-sm font-semibold ${colors.text}`}>
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
                const colors = getColorClasses(factor.color);
                return (
                  <AccordionItem
                    key={factor.id}
                    value={factor.id}
                    className={`border-4 ${colors.border} ${colors.bg} overflow-hidden`}
                    style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}
                  >
                    <AccordionTrigger
                      className={`px-6 md:px-8 py-6 hover:no-underline ${colors.accent} hover:bg-opacity-70 transition-colors`}
                    >
                      <div className="flex items-center gap-4 text-left w-full">
                        <span className="text-4xl">{factor.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge className={`text-2xl font-bold ${colors.bg} ${colors.text} border-2 ${colors.border}`}
                                   style={{ fontFamily: "serif" }}>
                              {factor.symbol}
                            </Badge>
                            <span className={`text-xl md:text-2xl font-bold ${colors.text}`} style={{ fontFamily: "serif" }}>
                              {factor.fullName}
                            </span>
                          </div>
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
                        <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
                          <h4 className="font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
                            📖 Định nghĩa:
                          </h4>
                          <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "serif" }}>
                            {factor.description}
                          </p>
                        </div>

                        {/* Relationship */}
                        <div className={`${colors.accent} border-l-4 ${colors.border} p-4`}>
                          <h4 className={`font-bold ${colors.text} mb-2`} style={{ fontFamily: "serif" }}>
                            🔗 Quan hệ với giá trị:
                          </h4>
                          <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "serif" }}>
                            {factor.relationship}
                          </p>
                        </div>

                        {/* Examples */}
                        {factor.examples && factor.examples.length > 0 && (
                          <div className="bg-green-50 border-l-4 border-green-600 p-4">
                            <h4 className="font-bold text-green-900 mb-2" style={{ fontFamily: "serif" }}>
                              💡 Ví dụ:
                            </h4>
                            <ul className="space-y-1">
                              {factor.examples.map((example, idx) => (
                                <li key={idx} className="text-gray-800" style={{ fontFamily: "serif" }}>
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

