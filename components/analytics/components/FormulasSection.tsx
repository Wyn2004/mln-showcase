"use client";

import { motion } from "framer-motion";
import { formulas } from "../data/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FormulasSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-indigo-50">
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
                Công Thức Tính Lượng Giá Trị
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
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
              <TabsList className="grid w-full grid-cols-5 gap-2 bg-indigo-100 p-3 border-4 border-indigo-600 h-auto"
                style={{ boxShadow: "4px 4px 0px rgba(79, 70, 229, 0.3)" }}>
                {formulas.map((formula, index) => (
                  <TabsTrigger
                    key={formula.id}
                    value={formula.id}
                    className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold border-2 border-indigo-400 py-3"
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
                    <Card className="border-8 border-indigo-600 bg-white"
                      style={{ boxShadow: "12px 12px 0px rgba(79, 70, 229, 0.3)" }}>
                      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b-4 border-indigo-600">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-indigo-800 flex items-center gap-3"
                          style={{ fontFamily: "serif" }}>
                          <span className="text-3xl">📐</span>
                          {formula.name}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-700 mt-2"
                          style={{ fontFamily: "serif" }}>
                          {formula.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        {/* Formula Display */}
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-600 p-8 mb-6 text-center"
                          style={{ boxShadow: "6px 6px 0px rgba(217, 119, 6, 0.3)" }}>
                          <div className="text-3xl md:text-5xl font-bold text-amber-900 font-mono tracking-wider">
                            {formula.formula}
                          </div>
                        </div>

                        {/* Variables */}
                        <div className="space-y-3">
                          <h4 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2"
                            style={{ fontFamily: "serif" }}>
                            <span>🔤</span>
                            Ký hiệu:
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {formula.variables.map((variable, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3 bg-blue-50 border-2 border-blue-400 p-4 rounded-lg"
                              >
                                <Badge className="text-xl font-bold bg-indigo-600 text-white px-4 py-2 font-mono">
                                  {variable.symbol}
                                </Badge>
                                <span className="text-gray-800 font-medium" style={{ fontFamily: "serif" }}>
                                  {variable.meaning}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Indicator */}
                        <div className="mt-6 pt-6 border-t-2 border-indigo-200">
                          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                              Công thức cơ bản
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                              Dễ nhớ, dễ áp dụng
                            </span>
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
            <Card className="border-4 border-green-600 bg-green-50"
              style={{ boxShadow: "6px 6px 0px rgba(22, 163, 74, 0.3)" }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">💡</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2" style={{ fontFamily: "serif" }}>
                      Lưu ý quan trọng
                    </h3>
                    <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "serif" }}>
                      Các công thức trên là nền tảng để hiểu cách tính toán giá trị hàng hóa.
                      Trong thực tế, giá cả thị trường còn chịu ảnh hưởng của nhiều yếu tố khác như
                      cung-cầu, cạnh tranh, chính sách nhà nước, và tâm lý thị trường.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

