"use client";

import { motion } from "framer-motion";
import { formulas } from "../data/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FormulasSection() {
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
                Công Thức Tính Lượng Giá Trị
              </h2>
            </div>
          </div>

          {/* Formulas Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue={formulas[0]?.id} className="w-full">
              <TabsList className="grid w-full grid-cols-5 gap-2 bg-[#130E07]/60 p-3 border-2 border-amber-600/50 h-auto"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                {formulas.map((formula, index) => (
                  <TabsTrigger
                    key={formula.id}
                    value={formula.id}
                    className="data-[state=active]:bg-amber-600/80 data-[state=active]:text-amber-50 text-amber-200 font-bold border border-amber-600/50 py-3"
                    style={{ fontFamily: "serif" }}
                  >
                    {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {formulas.map((formula) => (
                <TabsContent key={formula.id} value={formula.id} className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
                      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                      <CardHeader className="bg-[#1a1208]/60 border-b-2 border-amber-600/50">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-amber-50"
                          style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          {formula.name}
                        </CardTitle>
                        <CardDescription className="text-base text-amber-100/80 mt-2"
                          style={{ fontFamily: "serif" }}>
                          {formula.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        {/* Formula Display */}
                        <div className="bg-[#1a1208]/60 border-2 border-amber-600/50 p-8 mb-6 text-center rounded-lg"
                          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                          <div className="text-3xl md:text-5xl font-bold text-amber-300 font-mono tracking-wider">
                            {formula.formula}
                          </div>
                        </div>

                        {/* Variables */}
                        <div className="space-y-3">
                          <h4 className="text-xl font-bold text-amber-200 mb-4"
                            style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                            Ký hiệu:
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {formula.variables.map((variable, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3 bg-[#1a1208]/60 border border-amber-600/50 p-4 rounded-lg"
                              >
                                <Badge className="text-xl font-bold bg-amber-600/80 text-amber-50 px-4 py-2 font-mono">
                                  {variable.symbol}
                                </Badge>
                                <span className="text-amber-100 font-medium" style={{ fontFamily: "serif" }}>
                                  {variable.meaning}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Summary Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <CardContent className="p-6">
                <div>
                  <h3 className="text-xl font-bold text-amber-200 mb-2" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                    Lưu ý quan trọng
                  </h3>
                  <p className="text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                    Các công thức trên là nền tảng để hiểu cách tính toán giá trị hàng hóa.
                    Trong thực tế, giá cả thị trường còn chịu ảnh hưởng của nhiều yếu tố khác như
                    cung-cầu, cạnh tranh, chính sách nhà nước, và tâm lý thị trường.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

