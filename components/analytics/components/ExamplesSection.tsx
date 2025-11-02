"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { examples } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ExamplesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-pink-50">
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
              <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-4 px-8 py-4 border-4 border-pink-600 bg-pink-50 relative"
                  style={{ 
                    fontFamily: "serif",
                    boxShadow: "8px 8px 0px rgba(219, 39, 119, 0.3)"
                  }}>
                Ví Dụ Minh Họa Cụ Thể
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-6">
            {examples.map((example, index) => {
              const [isOpen, setIsOpen] = useState(false);
              
              const getFactorColor = (factor: string) => {
                const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
                  Q: { bg: "bg-green-50", border: "border-green-600", text: "text-green-800", badge: "bg-green-600" },
                  D: { bg: "bg-orange-50", border: "border-orange-600", text: "text-orange-800", badge: "bg-orange-600" },
                  P: { bg: "bg-blue-50", border: "border-blue-600", text: "text-blue-800", badge: "bg-blue-600" },
                  L: { bg: "bg-red-50", border: "border-red-600", text: "text-red-800", badge: "bg-red-600" }
                };
                return colors[factor] || colors.Q;
              };

              const colors = getFactorColor(example.factor);

              return (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <Card className={`border-4 ${colors.border} ${colors.bg} overflow-hidden`}
                          style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}>
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-6 hover:bg-opacity-70 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-left">
                              <Badge className={`${colors.badge} text-white text-2xl font-bold px-4 py-2`}>
                                {example.factor}
                              </Badge>
                              <div>
                                <h3 className={`text-xl md:text-2xl font-bold ${colors.text}`}
                                    style={{ fontFamily: "serif" }}>
                                  {example.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Click để xem chi tiết các kịch bản
                                </p>
                              </div>
                            </div>
                            <ChevronDown 
                              className={`w-6 h-6 ${colors.text} transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-6 pb-6 bg-white border-t-4 border-gray-200">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 pt-6"
                          >
                            {/* Scenarios */}
                            <div className="space-y-3">
                              {example.scenarios.map((scenario, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="bg-gray-50 border-l-4 border-indigo-600 p-4 rounded-r-lg"
                                >
                                  <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-gray-800 font-medium mb-2" style={{ fontFamily: "serif" }}>
                                        {scenario.description}
                                      </p>
                                      <div className="grid md:grid-cols-2 gap-3">
                                        <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded">
                                          <span className="text-xs text-blue-700 font-semibold">Giá trị:</span>
                                          <span className="ml-2 text-blue-900 font-bold font-mono">{scenario.value}</span>
                                        </div>
                                        <div className="bg-green-100 border border-green-300 px-3 py-2 rounded">
                                          <span className="text-xs text-green-700 font-semibold">Kết quả:</span>
                                          <span className="ml-2 text-green-900 font-bold">{scenario.result}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Conclusion */}
                            <div className={`${colors.bg} border-4 ${colors.border} p-4 rounded-lg mt-4`}
                                 style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}>
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                  <h4 className={`font-bold ${colors.text} mb-2`} style={{ fontFamily: "serif" }}>
                                    Kết luận:
                                  </h4>
                                  <p className="text-gray-800 font-medium" style={{ fontFamily: "serif" }}>
                                    {example.conclusion}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

