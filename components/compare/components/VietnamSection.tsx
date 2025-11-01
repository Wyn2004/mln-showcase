"use client";

import { motion } from "framer-motion";
import { vietnamModel } from "../data/data";
import Image from "next/image";

export default function VietnamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(220, 38, 38, 0.1) 50px,
            rgba(220, 38, 38, 0.1) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(220, 38, 38, 0.1) 50px,
            rgba(220, 38, 38, 0.1) 51px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Title with Flag Colors */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-20 blur-xl"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 px-8 py-6 border-8 border-red-700 bg-yellow-100 relative"
                  style={{ 
                    fontFamily: "serif",
                    boxShadow: "12px 12px 0px rgba(185, 28, 28, 0.3)"
                  }}>
                {vietnamModel.title}
              </h2>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 text-6xl">★</div>
            </motion.div>
          </div>

          {/* Images from compare folder */}
          <div className="flex justify-center gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="relative w-48 h-48 md:w-64 md:h-64 border-8 border-red-700"
              style={{ boxShadow: "10px 10px 0px rgba(185, 28, 28, 0.3)" }}
            >
              <Image
                src="/images/compare/download.png"
                alt="Vietnam economic model"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="relative w-48 h-48 md:w-64 md:h-64 border-8 border-yellow-600"
              style={{ boxShadow: "10px 10px 0px rgba(161, 98, 7, 0.3)" }}
            >
              <Image
                src="/images/compare/download (3).png"
                alt="Vietnam development"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {vietnamModel.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-6 border-red-600 p-6 md:p-8 relative"
                style={{ 
                  boxShadow: "10px 10px 0px rgba(185, 28, 28, 0.2)",
                  borderWidth: "6px"
                }}
              >
                {/* Decorative Corner Stars */}
                <div className="absolute -top-3 -left-3 text-yellow-500 text-3xl">★</div>
                <div className="absolute -top-3 -right-3 text-yellow-500 text-3xl">★</div>

                {/* Section Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 pb-3 border-b-4 border-yellow-400"
                    style={{ fontFamily: "serif" }}>
                  {section.title}
                </h3>

                {/* Section Content */}
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <motion.div
                      key={pIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: pIndex * 0.1 }}
                      className="flex items-start bg-amber-50 p-4 border-l-4 border-red-600"
                    >
                      <span className="text-red-600 mr-3 mt-1 font-bold text-xl">▸</span>
                      <p className="text-gray-800 leading-relaxed flex-1"
                         style={{ fontFamily: "serif", textAlign: "justify" }}>
                        {paragraph}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Challenges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center px-6 py-4 bg-yellow-100 border-4 border-red-600 inline-block"
                style={{ 
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(185, 28, 28, 0.3)"
                }}>
              NHỮNG THÁCH THỨC VÀ ĐỊNH HƯỚNG
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {vietnamModel.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-red-50 to-yellow-50 border-4 border-red-700 p-6"
                  style={{ boxShadow: "6px 6px 0px rgba(185, 28, 28, 0.2)" }}
                >
                  <h4 className="text-xl font-bold text-red-700 mb-3 flex items-center"
                      style={{ fontFamily: "serif" }}>
                    <span className="text-yellow-600 mr-2 text-2xl">⚠</span>
                    {challenge.title}
                  </h4>
                  <p className="text-gray-800 mb-3 leading-relaxed"
                     style={{ fontFamily: "serif", textAlign: "justify" }}>
                    {challenge.description}
                  </p>
                  {challenge.solution && (
                    <p className="text-red-700 font-semibold italic border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3"
                       style={{ fontFamily: "serif" }}>
                      → {challenge.solution}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

