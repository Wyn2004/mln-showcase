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
                Ví Dụ Minh Họa Cụ Thể
              </h2>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-6">
            {examples.map((example, index) => {
              const [isOpen, setIsOpen] = useState(false);
              

              return (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm overflow-hidden"
                          style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-6 hover:bg-[#1a1208]/50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-left">
                              <Badge className="bg-amber-600/50 text-amber-100 text-xl font-bold px-4 py-2 border border-amber-500/50">
                                {example.factor}
                              </Badge>
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-amber-100"
                                    style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                                  {example.title}
                                </h3>
                                <p className="text-sm text-amber-200/70 mt-1">
                                  Click để xem chi tiết các kịch bản
                                </p>
                              </div>
                            </div>
                            <ChevronDown 
                              className="w-6 h-6 text-amber-300 transition-transform duration-300"
                              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            />
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-6 pb-6 bg-[#1a1208]/60 border-t-2 border-amber-600/30">
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
                                  className="bg-[#130E07]/60 border-l-2 border-amber-600/50 p-4 rounded-r-lg"
                                >
                                  <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-amber-100 font-medium mb-2" style={{ fontFamily: "serif" }}>
                                        {scenario.description}
                                      </p>
                                      <div className="grid md:grid-cols-2 gap-3">
                                        <div className="bg-[#130E07]/60 border border-amber-600/30 px-3 py-2 rounded">
                                          <span className="text-xs text-amber-200/80 font-semibold">Giá trị:</span>
                                          <span className="ml-2 text-amber-300 font-bold font-mono">{scenario.value}</span>
                                        </div>
                                        <div className="bg-[#130E07]/60 border border-amber-600/30 px-3 py-2 rounded">
                                          <span className="text-xs text-amber-200/80 font-semibold">Kết quả:</span>
                                          <span className="ml-2 text-amber-300 font-bold">{scenario.result}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Conclusion */}
                            <div className="bg-[#130E07]/60 border-2 border-amber-600/50 p-4 rounded-lg mt-4"
                                 style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                              <div>
                                <h4 className="font-bold text-amber-200 mb-2" style={{ fontFamily: "serif" }}>
                                  Kết luận:
                                </h4>
                                <p className="text-amber-100 font-medium" style={{ fontFamily: "serif" }}>
                                  {example.conclusion}
                                </p>
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

