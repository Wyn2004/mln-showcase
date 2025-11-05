"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function DiagramSection() {
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
                Sơ Đồ Mô Phỏng Quy Luật Giá Trị
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
                <p className="text-lg text-amber-100 text-center leading-relaxed" style={{ fontFamily: "serif" }}>
                  Sơ đồ minh họa mối quan hệ giữa các yếu tố <strong className="text-amber-300">L, P, D, Q</strong> và cách chúng tác động đến
                  <strong className="text-amber-300"> giá trị hàng hóa</strong>, sau đó ảnh hưởng đến
                  <strong className="text-amber-300"> giá cả thị trường</strong> thông qua cơ chế cung-cầu.
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

            <div className="relative">
              <div className="border-2 border-amber-600/50 bg-[#130E07]/60 relative rounded-lg overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
                <Image
                  src="/images/analytics/anh1.png"
                  alt="Sơ đồ mô phỏng quy luật giá trị"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
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
            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-200 mb-3" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Đầu vào (Input)
                </h3>
                <ul className="space-y-2 text-amber-100" style={{ fontFamily: "serif" }}>
                  <li>• <strong className="text-amber-300">L</strong>: Lao động xã hội cần thiết</li>
                  <li>• <strong className="text-amber-300">P</strong>: Mức độ phức tạp lao động</li>
                  <li>• <strong className="text-amber-300">D</strong>: Cường độ lao động</li>
                  <li>• <strong className="text-amber-300">Q</strong>: Năng suất lao động</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-200 mb-3" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Đầu ra (Output)
                </h3>
                <ul className="space-y-2 text-amber-100" style={{ fontFamily: "serif" }}>
                  <li>• <strong className="text-amber-300">Giá trị hàng hóa</strong>: Được xác định bởi L, P, D, Q</li>
                  <li>• <strong className="text-amber-300">Giá cả thị trường</strong>: Dao động quanh giá trị</li>
                  <li>• <strong className="text-amber-300">Cung - Cầu</strong>: Điều tiết giá cả</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

