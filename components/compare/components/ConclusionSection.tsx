"use client";

import { motion } from "framer-motion";
import { conclusion } from "../data/data";

export default function ConclusionSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-red-900 via-red-800 to-amber-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }} />
      </div>

      {/* Stars */}
      <div className="absolute top-10 left-10 text-yellow-400 text-6xl opacity-30 animate-pulse">★</div>
      <div className="absolute top-20 right-20 text-yellow-400 text-5xl opacity-20 animate-pulse" style={{ animationDelay: "0.5s" }}>★</div>
      <div className="absolute bottom-20 left-1/4 text-yellow-400 text-7xl opacity-25 animate-pulse" style={{ animationDelay: "1s" }}>★</div>
      <div className="absolute bottom-10 right-1/3 text-yellow-400 text-4xl opacity-30 animate-pulse" style={{ animationDelay: "1.5s" }}>★</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 px-8 py-6 border-8 border-yellow-400 bg-red-700/80 backdrop-blur-sm inline-block"
              style={{ 
                fontFamily: "serif",
                textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                boxShadow: "12px 12px 0px rgba(202, 138, 4, 0.4)"
              }}>
              {conclusion.title}
            </motion.h2>
          </div>

          {/* Content */}
          <div className="bg-amber-50 border-8 border-yellow-600 p-8 md:p-12 mb-12"
               style={{ 
                 boxShadow: "16px 16px 0px rgba(161, 98, 7, 0.3)",
                 backgroundImage: `linear-gradient(rgba(255,251,235,0.95), rgba(255,251,235,0.95)), 
                                   repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)`
               }}>
            
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-red-700"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-red-700"></div>

            <div className="space-y-6 relative">
              {conclusion.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-lg leading-relaxed text-gray-800"
                  style={{ fontFamily: "serif", textAlign: "justify" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-100 to-amber-100 border-8 border-red-700 p-8 md:p-12 relative"
            style={{ boxShadow: "16px 16px 0px rgba(185, 28, 28, 0.4)" }}
          >
            {/* Quote Marks */}
            <div className="absolute -top-6 -left-6 text-8xl text-red-700 opacity-50 font-serif">"</div>
            <div className="absolute -bottom-6 -right-6 text-8xl text-red-700 opacity-50 font-serif">"</div>

            {/* Quote Content */}
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-red-900 font-bold leading-relaxed mb-6 text-center italic"
                 style={{ fontFamily: "serif" }}>
                {conclusion.quote.text}
              </p>
              
              {/* Author */}
              <div className="text-right">
                <div className="inline-block bg-red-700 text-yellow-100 px-6 py-3 border-4 border-yellow-600"
                     style={{ boxShadow: "6px 6px 0px rgba(161, 98, 7, 0.3)" }}>
                  <p className="text-lg font-bold" style={{ fontFamily: "serif" }}>
                    — {conclusion.quote.author}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-yellow-400 border-4 border-red-700 px-8 py-4"
                 style={{ boxShadow: "8px 8px 0px rgba(185, 28, 28, 0.4)" }}>
              <p className="text-2xl md:text-3xl font-bold text-red-900"
                 style={{ fontFamily: "serif" }}>
                ★ VIỆT NAM TIẾN LÊN ★
              </p>
            </div>
          </motion.div>
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

