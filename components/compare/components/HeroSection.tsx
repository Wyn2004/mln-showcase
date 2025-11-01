"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-amber-900 py-20">
      {/* Retro Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,.05) 10px,
            rgba(255,255,255,.05) 20px
          )`
        }} />
      </div>

      {/* Decorative Stars */}
      <div className="absolute top-10 left-10 text-yellow-400 text-6xl opacity-30">★</div>
      <div className="absolute top-20 right-20 text-yellow-400 text-4xl opacity-20">★</div>
      <div className="absolute bottom-10 left-1/4 text-yellow-400 text-5xl opacity-25">★</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Title */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 mb-4 tracking-tight"
                style={{ 
                  textShadow: "4px 4px 0px rgba(0,0,0,0.3), 2px 2px 0px rgba(255,215,0,0.2)",
                  fontFamily: "serif"
                }}>
              SO SÁNH
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold text-white border-4 border-yellow-400 px-6 py-3 bg-red-700/50 backdrop-blur-sm"
                style={{ fontFamily: "serif" }}
              >
                TƯ BẢN CHỦ NGHĨA
              </motion.h2>
              <span className="text-yellow-300 text-4xl font-bold">⚔</span>
              <motion.h2 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold text-white border-4 border-yellow-400 px-6 py-3 bg-red-700/50 backdrop-blur-sm"
                style={{ fontFamily: "serif" }}
              >
                XÃ HỘI CHỦ NGHĨA
              </motion.h2>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-yellow-100 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "serif" }}
          >
            Từ mâu thuẫn của tư bản đến khát vọng của xã hội chủ nghĩa
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent max-w-2xl mx-auto"
          />
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-amber-50">
          <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

