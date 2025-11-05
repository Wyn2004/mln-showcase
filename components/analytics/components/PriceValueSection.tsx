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
                Mối Quan Hệ Giá Trị - Giá Cả
              </h2>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <CardContent className="p-6">
                <p className="text-lg text-amber-100 leading-relaxed" style={{ fontFamily: "serif" }}>
                  <strong className="text-amber-300">Giá cả</strong> là biểu hiện bằng tiền của <strong className="text-amber-300">giá trị hàng hóa</strong>.
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
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm mb-6"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-50 text-center mb-3"
                  style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Biểu Đồ Dao Động Giá Cả Xoay Quanh Giá Trị
                </h3>
                <p className="text-base text-amber-100/80 text-center" style={{ fontFamily: "serif" }}>
                  Theo Quy luật giá trị trong Kinh tế chính trị Mác-Lênin
                </p>
              </CardContent>
            </Card>

            <div className="border-2 border-amber-600/50 bg-[#130E07]/60 relative rounded-lg overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
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
            <h3 className="text-2xl md:text-3xl font-bold text-center text-amber-50 mb-8"
              style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
              Cơ Chế Hoạt Động
            </h3>

            <div className="space-y-6">
              {marketConditions.map((condition, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm hover:bg-[#1a1208]/90 transition-colors"
                      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-5 gap-4 items-center">
                          {/* Condition */}
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-600/50 text-amber-100 p-3 rounded-lg">
                              {getIcon(condition.condition)}
                            </div>
                            <div>
                              <div className="text-xs text-amber-200/80 font-semibold">Tình trạng</div>
                              <div className="text-lg font-bold text-amber-100" style={{ fontFamily: "serif" }}>
                                {condition.condition}
                              </div>
                            </div>
                          </div>

                          {/* Supply/Demand */}
                          <div>
                            <div className="text-xs text-amber-200/80 font-semibold mb-1">Cung - Cầu</div>
                            <div className="font-mono text-sm font-bold text-amber-100">
                              {condition.supply}
                            </div>
                            <div className="font-mono text-xs text-amber-200/70">
                              {condition.demand}
                            </div>
                          </div>

                          {/* Price vs Value */}
                          <div>
                            <div className="text-xs text-amber-200/80 font-semibold mb-1">Giá cả vs Giá trị</div>
                            <div className="font-bold text-sm text-amber-100" style={{ fontFamily: "serif" }}>
                              {condition.priceVsValue}
                            </div>
                          </div>

                          {/* Result */}
                          <div>
                            <div className="text-xs text-amber-200/80 font-semibold mb-1">Kết quả</div>
                            <div className="text-sm text-amber-100" style={{ fontFamily: "serif" }}>
                              {condition.result}
                            </div>
                          </div>

                          {/* Action */}
                          <div>
                            <div className="text-xs text-amber-200/80 font-semibold mb-1">Hành động</div>
                            <div className="text-sm font-bold text-amber-100" style={{ fontFamily: "serif" }}>
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

