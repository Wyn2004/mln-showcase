"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, ChartLine, Settings } from "lucide-react";

export default function CallToActionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="relative py-32 overflow-hidden"
    >

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8"
        >
          <div className="mb-4 flex justify-center">
            <TrendingUp className="w-16 h-16 md:w-20 md:h-20 text-amber-400" />
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-amber-100" style={{ fontFamily: "serif" }}>
          Bắt Đầu Học Tập Ngay Hôm Nay
        </h2>
        <p className="text-2xl text-amber-200/90 mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "serif" }}>
          Khám phá các công cụ tương tác để hiểu sâu hơn về kinh tế chính trị Mác-Lênin
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/phan-phoi-thu-nhap">
              <Button size="lg" className="text-lg px-10 py-8 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white border-2 border-amber-500 shadow-2xl shadow-amber-900/50">
                <ChartLine className="w-5 h-5 mr-2" />
                Khám Phá Phân Phối Thu Nhập
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/gia-tri-thang-du">
              <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-2 border-amber-400 bg-amber-950/50 text-amber-200 hover:bg-amber-900/50 backdrop-blur-sm shadow-xl">
                <Settings className="w-5 h-5 mr-2" />
                Tính Toán Giá Trị Thặng Dư
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
