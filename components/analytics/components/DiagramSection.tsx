"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function DiagramSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-blue-50">
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
                Sơ Đồ Mô Phỏng Quy Luật Giá Trị
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
                <p className="text-lg text-gray-800 text-center leading-relaxed" style={{ fontFamily: "serif" }}>
                  Sơ đồ minh họa mối quan hệ giữa các yếu tố <strong>L, P, D, Q</strong> và cách chúng tác động đến
                  <strong className="text-purple-700"> giá trị hàng hóa</strong>, sau đó ảnh hưởng đến
                  <strong className="text-purple-700"> giá cả thị trường</strong> thông qua cơ chế cung-cầu.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Diagram Image with Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Title Card */}
            <Card className="border-8 border-indigo-600 bg-gradient-to-br from-indigo-50 to-blue-50 mb-6"
              style={{ boxShadow: "8px 8px 0px rgba(79, 70, 229, 0.3)" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-indigo-800 text-center mb-3"
                  style={{ fontFamily: "serif" }}>
                  Biểu Đồ Dao Động Giá Cả Xoay Quanh Giá Trị
                </h3>
                <p className="text-base text-gray-700 text-center" style={{ fontFamily: "serif" }}>
                  Theo Quy luật giá trị trong Kinh tế chính trị Mác-Lênin
                </p>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="border-8 border-indigo-600 bg-white relative"
                style={{ boxShadow: "12px 12px 0px rgba(79, 70, 229, 0.4)" }}>
                <Image
                  src="/images/analytics/anh1.png"
                  alt="Sơ đồ mô phỏng quy luật giá trị"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-yellow-500"></div>
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-yellow-500"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-500"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-500"></div>
            </div>
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            <Card className="border-4 border-blue-600 bg-blue-50"
              style={{ boxShadow: "4px 4px 0px rgba(37, 99, 235, 0.3)" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2" style={{ fontFamily: "serif" }}>
                  <span className="text-2xl">📊</span>
                  Đầu vào (Input)
                </h3>
                <ul className="space-y-2 text-gray-800" style={{ fontFamily: "serif" }}>
                  <li>• <strong>L</strong>: Lao động xã hội cần thiết</li>
                  <li>• <strong>P</strong>: Mức độ phức tạp lao động</li>
                  <li>• <strong>D</strong>: Cường độ lao động</li>
                  <li>• <strong>Q</strong>: Năng suất lao động</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-4 border-green-600 bg-green-50"
              style={{ boxShadow: "4px 4px 0px rgba(22, 163, 74, 0.3)" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2" style={{ fontFamily: "serif" }}>
                  <span className="text-2xl">💰</span>
                  Đầu ra (Output)
                </h3>
                <ul className="space-y-2 text-gray-800" style={{ fontFamily: "serif" }}>
                  <li>• <strong>Giá trị hàng hóa</strong>: Được xác định bởi L, P, D, Q</li>
                  <li>• <strong>Giá cả thị trường</strong>: Dao động quanh giá trị</li>
                  <li>• <strong>Cung - Cầu</strong>: Điều tiết giá cả</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

