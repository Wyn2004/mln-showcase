"use client";

import { motion } from "motion/react";
import { Skiper52 } from "@/components/ui/skiper-ui/skiper52";

export default function HistoricalSection() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="relative py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6" style={{ fontFamily: "serif" }}>
            Bối Cảnh Lịch Sử
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </motion.div>
        <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-700/20">
          <Skiper52 />
        </div>
      </div>
    </motion.section>
  );
}
