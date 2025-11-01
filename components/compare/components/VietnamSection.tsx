"use client";

import { motion } from "framer-motion";
import { vietnamModel } from "../data/data";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function VietnamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(220, 38, 38, 0.1) 50px,
            rgba(220, 38, 38, 0.1) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(220, 38, 38, 0.1) 50px,
            rgba(220, 38, 38, 0.1) 51px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Title with Flag Colors */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-20 blur-xl"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 px-8 py-6 border-8 border-red-700 bg-yellow-100 relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "12px 12px 0px rgba(185, 28, 28, 0.3)"
                }}>
                {vietnamModel.title}
              </h2>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 text-6xl">★</div>
            </motion.div>
          </div>

          {/* Images from compare folder */}
          <div className="flex justify-center gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="relative w-48 h-48 md:w-64 md:h-64 border-8 border-red-700"
              style={{ boxShadow: "10px 10px 0px rgba(185, 28, 28, 0.3)" }}
            >
              <Image
                src="/images/compare/download.png"
                alt="Vietnam economic model"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="relative w-48 h-48 md:w-64 md:h-64 border-8 border-yellow-600"
              style={{ boxShadow: "10px 10px 0px rgba(161, 98, 7, 0.3)" }}
            >
              <Image
                src="/images/compare/download (3).png"
                alt="Vietnam development"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Content Sections with Tabs */}
          <Tabs defaultValue={vietnamModel.sections[0]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 bg-transparent h-auto p-0 mb-8">
              {vietnamModel.sections.map((section, index) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="data-[state=active]:bg-red-700 data-[state=active]:text-yellow-100 bg-yellow-100 text-red-800 border-4 border-red-700 font-bold text-lg py-4 px-6"
                  style={{
                    fontFamily: "serif",
                    boxShadow: "6px 6px 0px rgba(185, 28, 28, 0.3)"
                  }}
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {vietnamModel.sections.map((section, index) => (
              <TabsContent key={section.id} value={section.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-8 border-red-600 p-6 md:p-8 relative"
                  style={{
                    boxShadow: "12px 12px 0px rgba(185, 28, 28, 0.3)",
                  }}
                >
                  {/* Decorative Corner Stars */}
                  <div className="absolute -top-4 -left-4 text-yellow-500 text-5xl">★</div>
                  <div className="absolute -top-4 -right-4 text-yellow-500 text-5xl">★</div>

                  {/* Section Content */}
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <motion.div
                        key={pIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pIndex * 0.1 }}
                        className="flex items-start bg-amber-50 p-5 border-l-8 border-red-600"
                        style={{ boxShadow: "4px 4px 0px rgba(185, 28, 28, 0.1)" }}
                      >
                        <span className="text-red-600 mr-3 mt-1 font-bold text-2xl">▸</span>
                        <p className="text-gray-800 leading-relaxed flex-1 text-lg"
                          style={{ fontFamily: "serif", textAlign: "justify" }}>
                          {paragraph}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Challenges Section with Collapsible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-red-800 px-6 py-4 bg-yellow-100 border-8 border-red-600 inline-block"
                style={{
                  fontFamily: "serif",
                  boxShadow: "10px 10px 0px rgba(185, 28, 28, 0.4)"
                }}>
                NHỮNG THÁCH THỨC VÀ ĐỊNH HƯỚNG
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {vietnamModel.challenges.map((challenge, index) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                  <Collapsible
                    key={index}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-red-50 to-yellow-50 border-6 border-red-700 overflow-hidden"
                      style={{
                        boxShadow: "8px 8px 0px rgba(185, 28, 28, 0.3)",
                        borderWidth: "6px"
                      }}
                    >
                      <CollapsibleTrigger className="w-full p-6 hover:bg-red-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-red-700 flex items-center gap-3"
                            style={{ fontFamily: "serif" }}>
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                            {challenge.title}
                          </h4>
                          <ChevronDown
                            className={`w-6 h-6 text-red-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="px-6 pb-6 space-y-4"
                        >
                          <p className="text-gray-800 leading-relaxed bg-white p-4 border-l-4 border-red-600"
                            style={{
                              fontFamily: "serif",
                              textAlign: "justify",
                              boxShadow: "4px 4px 0px rgba(185, 28, 28, 0.1)"
                            }}>
                            {challenge.description}
                          </p>
                          {challenge.solution && (
                            <div className="bg-yellow-50 border-4 border-yellow-500 p-4"
                              style={{ boxShadow: "4px 4px 0px rgba(161, 98, 7, 0.2)" }}>
                              <p className="text-red-700 font-semibold flex items-start gap-2"
                                style={{ fontFamily: "serif" }}>
                                <span className="text-yellow-600 text-xl">→</span>
                                <span>{challenge.solution}</span>
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </CollapsibleContent>
                    </motion.div>
                  </Collapsible>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

