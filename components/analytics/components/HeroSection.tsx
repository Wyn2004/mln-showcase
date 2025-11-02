"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 py-20">
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
      <div className="absolute bottom-20 right-1/3 text-yellow-400 text-3xl opacity-15">★</div>

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
              {introduction.title}
            </h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-bold text-white"
              style={{ 
                textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
                fontFamily: "serif"
              }}
            >
              {introduction.subtitle}
            </motion.h2>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-32 h-1 bg-yellow-400 mx-auto mb-8"
            style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "serif" }}
          >
            Khám phá cơ chế hoạt động của quy luật kinh tế cơ bản
          </motion.p>

          {/* Animated Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center gap-8 text-4xl"
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              ⏱️
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              🎓
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            >
              💪
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              ⚡
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
                fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
    </section>
  );
}

