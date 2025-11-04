"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartLine, Settings, Scale } from "lucide-react";

export default function TransitionSection() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>
            Khám phá các nguyên lý cơ bản
          </h2>
          <p className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto" style={{ fontFamily: "serif" }}>
            về phân phối thu nhập và giá trị thặng dư trong chủ nghĩa Mác-Lênin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto"
        >
          <Link href="/phan-phoi-thu-nhap">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="text-base px-8 py-6 bg-amber-700/80 hover:bg-amber-600 text-amber-100 hover:text-amber-50 border border-amber-600/50 hover:border-amber-500 backdrop-blur-sm w-full md:w-auto transition-colors">
                <ChartLine className="w-5 h-5 mr-2" />
                Phân Phối Thu Nhập
              </Button>
            </motion.div>
          </Link>

          <Link href="/gia-tri-thang-du">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" className="text-base px-8 py-6 border border-amber-600/50 hover:border-amber-500 bg-[#130E07]/60 hover:bg-amber-800/40 text-amber-200 hover:text-amber-100 backdrop-blur-sm w-full md:w-auto transition-colors">
                <Settings className="w-5 h-5 mr-2" />
                Giá Trị Thặng Dư
              </Button>
            </motion.div>
          </Link>

          <Link href="/so-sanh-tbcn-xhcn">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" className="text-base px-8 py-6 border border-amber-600/50 hover:border-amber-500 bg-[#130E07]/60 hover:bg-amber-800/40 text-amber-200 hover:text-amber-100 backdrop-blur-sm w-full md:w-auto transition-colors">
                <Scale className="w-5 h-5 mr-2" />
                So Sánh TBCN & XHCN
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
