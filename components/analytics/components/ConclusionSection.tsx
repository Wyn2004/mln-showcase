"use client";

import { motion } from "framer-motion";
import { conclusion } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Landmark } from "lucide-react";

export default function ConclusionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 py-20">
      {/* Retro Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,.05) 10px,
            rgba(255,255,255,.05) 20px
          )`
        }} />
      </div>

      {/* Animated Stars */}
      <div className="absolute top-10 left-10 text-yellow-300 text-6xl opacity-40">
        <motion.span
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          ★
        </motion.span>
      </div>
      <div className="absolute top-20 right-20 text-yellow-300 text-5xl opacity-30">
        <motion.span
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          ★
        </motion.span>
      </div>
      <div className="absolute bottom-10 left-1/4 text-yellow-300 text-7xl opacity-35">
        <motion.span
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          ★
        </motion.span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block relative"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 px-8 py-4 border-4 border-yellow-400 bg-red-900 bg-opacity-50 relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(0,0,0,0.5)"
                }}>
                {conclusion.title}
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-300 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-300 text-4xl">★</div>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-8 border-yellow-400 bg-gradient-to-br from-amber-50 to-yellow-50"
              style={{ boxShadow: "12px 12px 0px rgba(0,0,0,0.4)" }}>
              <CardContent className="p-8 md:p-12">
                <div className="text-6xl text-yellow-600 mb-4">"</div>
                <p className="text-xl md:text-2xl text-gray-800 font-bold text-center leading-relaxed mb-4"
                  style={{ fontFamily: "serif" }}>
                  {conclusion.quote}
                </p>
                <div className="text-6xl text-yellow-600 text-right">"</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Practical Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Tabs defaultValue="business" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-yellow-100 p-2 border-4 border-yellow-400 h-auto"
                style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.3)" }}>
                <TabsTrigger
                  value="business"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white font-bold text-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: "serif" }}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Doanh nghiệp</span>
                </TabsTrigger>
                <TabsTrigger
                  value="government"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: "serif" }}
                >
                  <Landmark className="w-5 h-5" />
                  <span>Nhà nước</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="business" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-6 border-orange-600 bg-orange-50"
                    style={{ boxShadow: "8px 8px 0px rgba(0,0,0,0.3)" }}>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-3"
                        style={{ fontFamily: "serif" }}>
                        <Building2 className="w-8 h-8" />
                        Đối với doanh nghiệp:
                      </h3>
                      <div className="space-y-4">
                        {conclusion.forBusiness.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 bg-white border-l-4 border-orange-600 p-4 rounded-r-lg"
                            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                          >
                            <span className="text-2xl flex-shrink-0">✓</span>
                            <p className="text-gray-800 text-lg" style={{ fontFamily: "serif" }}>
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="government" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-6 border-red-600 bg-red-50"
                    style={{ boxShadow: "8px 8px 0px rgba(0,0,0,0.3)" }}>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3"
                        style={{ fontFamily: "serif" }}>
                        <Landmark className="w-8 h-8" />
                        Đối với nhà nước:
                      </h3>
                      <div className="space-y-4">
                        {conclusion.forGovernment.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 bg-white border-l-4 border-red-600 p-4 rounded-r-lg"
                            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                          >
                            <span className="text-2xl flex-shrink-0">✓</span>
                            <p className="text-gray-800 text-lg" style={{ fontFamily: "serif" }}>
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-xl md:text-2xl text-yellow-100 font-bold"
              style={{
                fontFamily: "serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}>
              Việc nắm vững và vận dụng đúng quy luật này là điều kiện cần thiết
              để phát triển kinh tế bền vững và hiệu quả.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
    </section>
  );
}

