"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ChartLine, Settings, Scale } from "lucide-react";

export default function TransitionSection() {
  return (
    <section className="relative bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="mb-4 flex justify-center">
              <BookOpen className="w-16 h-16 md:w-20 md:h-20 text-amber-400" />
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6 leading-tight" style={{ fontFamily: "serif" }}>
            Khám phá các nguyên lý cơ bản
          </h2>
          <p className="text-2xl text-amber-200/90 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "serif" }}>
            về phân phối thu nhập và giá trị thặng dư trong chủ nghĩa Mác-Lênin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/phan-phoi-thu-nhap">
              <Button size="lg" className="text-lg px-10 py-8 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white border-2 border-amber-500 shadow-2xl shadow-amber-900/50 w-full md:w-auto">
                <ChartLine className="w-5 h-5 mr-2" />
                Phân Phối Thu Nhập
              </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/gia-tri-thang-du">
              <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-2 border-amber-400 bg-amber-950/50 text-amber-200 hover:bg-amber-900/50 backdrop-blur-sm shadow-xl w-full md:w-auto">
                <Settings className="w-5 h-5 mr-2" />
                Giá Trị Thặng Dư
              </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/so-sanh-tbcn-xhcn">
              <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-2 border-red-500 bg-red-950/30 text-red-300 hover:bg-red-900/50 backdrop-blur-sm shadow-xl w-full md:w-auto">
                <Scale className="w-5 h-5 mr-2" />
                So Sánh TBCN & XHCN
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
