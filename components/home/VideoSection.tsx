"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoSection() {
  const videoId = "oQuOjoO-N-k";

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-amber-50 mb-4 inline-block px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{
                fontFamily: "serif",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
              }}
            >
              VIDEO TRỌNG ĐIỂM
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-amber-100 mt-6"
              style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              Khám phá những nội dung đặc sắc về chủ nghĩa Mác - Lênin
            </motion.p>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/20 via-amber-500/20 to-amber-600/20 rounded-2xl blur-xl"></div>
            
            {/* Video wrapper with elegant border */}
            <div
              className="relative bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-600/50 rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 4px rgba(251, 191, 36, 0.1)"
              }}
            >
              {/* Aspect ratio container */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: "none" }}
                />
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/50"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/50"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400/50"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/50"></div>
            </div>

            {/* Play icon overlay (optional, shows before video loads) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-20 h-20 rounded-full bg-amber-500/20 backdrop-blur-sm border-2 border-amber-400/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-10 h-10 text-amber-300 ml-1" fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>

          {/* Additional info or description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 px-6 py-3 rounded-lg">
              <p className="text-amber-200/80 text-sm md:text-base" style={{ fontFamily: "serif" }}>
                Nhấn play để xem video chi tiết
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

