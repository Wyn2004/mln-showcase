"use client";

import { motion } from "framer-motion";
import { conclusion } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConclusionSection() {
  return (
    <section className="relative overflow-hidden py-20">

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
              <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-4 px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
                style={{
                  fontFamily: "serif",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                }}>
                {conclusion.title}
              </h2>
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
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <CardContent className="p-8 md:p-12">
                <p className="text-xl md:text-2xl text-amber-100 font-bold text-center leading-relaxed italic"
                  style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  "{conclusion.quote}"
                </p>
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
              <TabsList className="grid w-full grid-cols-2 bg-[#130E07]/60 p-2 border-2 border-amber-600/50 h-auto"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                <TabsTrigger
                  value="business"
                  className="data-[state=active]:bg-amber-600/80 data-[state=active]:text-amber-50 text-amber-200 font-bold text-lg"
                  style={{ fontFamily: "serif" }}
                >
                  Doanh nghiệp
                </TabsTrigger>
                <TabsTrigger
                  value="government"
                  className="data-[state=active]:bg-amber-600/80 data-[state=active]:text-amber-50 text-amber-200 font-bold text-lg"
                  style={{ fontFamily: "serif" }}
                >
                  Nhà nước
                </TabsTrigger>
              </TabsList>

              <TabsContent value="business" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
                    style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-amber-200 mb-6"
                        style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Đối với doanh nghiệp:
                      </h3>
                      <div className="space-y-4">
                        {conclusion.forBusiness.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 bg-[#1a1208]/60 border-l-2 border-amber-600/50 p-4 rounded-r-lg"
                            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}
                          >
                            <span className="text-amber-300 flex-shrink-0">•</span>
                            <p className="text-amber-100 text-lg" style={{ fontFamily: "serif" }}>
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
                  <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
                    style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-amber-200 mb-6"
                        style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Đối với nhà nước:
                      </h3>
                      <div className="space-y-4">
                        {conclusion.forGovernment.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 bg-[#1a1208]/60 border-l-2 border-amber-600/50 p-4 rounded-r-lg"
                            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}
                          >
                            <span className="text-amber-300 flex-shrink-0">•</span>
                            <p className="text-amber-100 text-lg" style={{ fontFamily: "serif" }}>
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
            <p className="text-xl md:text-2xl text-amber-100 font-bold"
              style={{
                fontFamily: "serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
              }}>
              Việc nắm vững và vận dụng đúng quy luật này là điều kiện cần thiết
              để phát triển kinh tế bền vững và hiệu quả.
            </p>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

