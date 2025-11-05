"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">

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
            <h1 className="text-5xl md:text-7xl font-bold text-amber-50 mb-4 tracking-tight"
                style={{ 
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(251, 191, 36, 0.3)",
                  fontFamily: "serif"
                }}>
              {introduction.title}
            </h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-bold text-amber-100"
              style={{ 
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
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
            className="w-32 h-1 bg-amber-500 mx-auto mb-8"
            style={{ boxShadow: "0 2px 8px rgba(251, 191, 36, 0.5)" }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-amber-200/90 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            Khám phá cơ chế hoạt động của quy luật kinh tế cơ bản
          </motion.p>

        </motion.div>
      </div>

    </section>
  );
}

