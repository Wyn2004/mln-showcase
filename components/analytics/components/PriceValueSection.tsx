"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { marketConditions } from "../data/data";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PriceValueSection() {
  const getIcon = (condition: string) => {
    if (condition === "Khan hiếm") return <TrendingUp className="w-6 h-6" />;
    if (condition === "Dư thừa") return <TrendingDown className="w-6 h-6" />;
    return <Minus className="w-6 h-6" />;
  };

  const getColorClasses = (condition: string) => {
    if (condition === "Khan hiếm") return {
      bg: "bg-red-50",
      border: "border-red-600",
      text: "text-red-800",
      badge: "bg-red-600"
    };
    if (condition === "Dư thừa") return {
      bg: "bg-blue-50",
      border: "border-blue-600",
      text: "text-blue-800",
      badge: "bg-blue-600"
    };
    return {
      bg: "bg-green-50",
      border: "border-green-600",
      text: "text-green-800",
      badge: "bg-green-600"
    };
  };

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 to-purple-50">
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
              <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 px-8 py-4 border-4 border-purple-600 bg-purple-50 relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(147, 51, 234, 0.3)"
                }}>
                Mối Quan Hệ Giá Trị - Giá Cả
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="border-4 border-purple-600 bg-purple-50"
              style={{ boxShadow: "6px 6px 0px rgba(147, 51, 234, 0.3)" }}>
              <CardContent className="p-6">
                <p className="text-lg text-gray-800 leading-relaxed" style={{ fontFamily: "serif" }}>
                  <strong className="text-purple-700">Giá cả</strong> là biểu hiện bằng tiền của <strong className="text-purple-700">giá trị hàng hóa</strong>.
                  Giá trị là cơ sở của giá cả, nhưng trên thị trường, giá cả còn chịu ảnh hưởng của nhiều yếu tố khác như
                  quan hệ cung-cầu, cạnh tranh, sức mua của đồng tiền.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chart Image with Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            {/* Title Card */}
            <Card className="border-8 border-pink-600 bg-gradient-to-br from-pink-50 to-rose-50 mb-6"
              style={{ boxShadow: "8px 8px 0px rgba(219, 39, 119, 0.3)" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-pink-800 text-center mb-3"
                  style={{ fontFamily: "serif" }}>
                  Biểu Đồ Dao Động Giá Cả Xoay Quanh Giá Trị
                </h3>
                <p className="text-base text-gray-700 text-center" style={{ fontFamily: "serif" }}>
                  Theo Quy luật giá trị trong Kinh tế chính trị Mác-Lênin
                </p>
              </CardContent>
            </Card>

            <div className="border-8 border-pink-600 bg-white relative"
              style={{ boxShadow: "12px 12px 0px rgba(219, 39, 119, 0.4)" }}>
              <Image
                src="/images/analytics/anh2.png"
                alt="Biểu đồ dao động giá cả xoay quanh giá trị"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Market Conditions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-indigo-800 mb-8"
              style={{ fontFamily: "serif" }}>
              Cơ Chế Hoạt Động
            </h3>

            <div className="space-y-6">
              {marketConditions.map((condition, index) => {
                const colors = getColorClasses(condition.condition);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-4 ${colors.border} ${colors.bg} hover:scale-[1.02] transition-transform`}
                      style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-5 gap-4 items-center">
                          {/* Condition */}
                          <div className="flex items-center gap-3">
                            <div className={`${colors.badge} text-white p-3 rounded-lg`}>
                              {getIcon(condition.condition)}
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 font-semibold">Tình trạng</div>
                              <div className={`text-lg font-bold ${colors.text}`} style={{ fontFamily: "serif" }}>
                                {condition.condition}
                              </div>
                            </div>
                          </div>

                          {/* Supply/Demand */}
                          <div>
                            <div className="text-xs text-gray-600 font-semibold mb-1">Cung - Cầu</div>
                            <div className="font-mono text-sm font-bold text-gray-800">
                              {condition.supply}
                            </div>
                            <div className="font-mono text-xs text-gray-600">
                              {condition.demand}
                            </div>
                          </div>

                          {/* Price vs Value */}
                          <div>
                            <div className="text-xs text-gray-600 font-semibold mb-1">Giá cả vs Giá trị</div>
                            <div className={`font-bold text-sm ${colors.text}`} style={{ fontFamily: "serif" }}>
                              {condition.priceVsValue}
                            </div>
                          </div>

                          {/* Result */}
                          <div>
                            <div className="text-xs text-gray-600 font-semibold mb-1">Kết quả</div>
                            <div className="text-sm text-gray-800" style={{ fontFamily: "serif" }}>
                              {condition.result}
                            </div>
                          </div>

                          {/* Action */}
                          <div>
                            <div className="text-xs text-gray-600 font-semibold mb-1">Hành động</div>
                            <div className={`text-sm font-bold ${colors.text}`} style={{ fontFamily: "serif" }}>
                              {condition.action}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

