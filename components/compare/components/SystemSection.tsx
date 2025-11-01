"use client";

import { motion } from "framer-motion";
import { Section } from "../data/data";
import Image from "next/image";

interface SystemSectionProps {
  title: string;
  sections: Section[];
  color: "red" | "yellow";
  images: string[];
}

export default function SystemSection({ title, sections, color, images }: SystemSectionProps) {
  const isRed = color === "red";
  const bgGradient = isRed 
    ? "from-red-100 to-red-50" 
    : "from-yellow-100 to-yellow-50";
  const borderColor = isRed ? "border-red-700" : "border-yellow-700";
  const textColor = isRed ? "text-red-900" : "text-yellow-900";
  const accentColor = isRed ? "text-red-600" : "text-yellow-600";
  const bgBox = isRed ? "bg-red-50" : "bg-yellow-50";
  const shadowColor = isRed 
    ? "rgba(185, 28, 28, 0.2)" 
    : "rgba(161, 98, 7, 0.2)";

  return (
    <section className={`py-16 bg-gradient-to-b ${bgGradient}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4 inline-block px-8 py-4 border-4 ${borderColor} bg-white`}
                style={{ 
                  fontFamily: "serif",
                  boxShadow: `8px 8px 0px ${shadowColor}`
                }}>
              {title}
            </h2>
          </div>

          {/* Images Row */}
          <div className="flex justify-center gap-6 mb-12">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative w-32 h-32 md:w-40 md:h-40 border-4 ${borderColor}`}
                style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
              >
                <Image
                  src={img}
                  alt={`${title} illustration ${idx + 1}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${bgBox} border-4 ${borderColor} p-6 md:p-8`}
                style={{ boxShadow: `8px 8px 0px ${shadowColor}` }}
              >
                {/* Section Title */}
                <h3 className={`text-2xl md:text-3xl font-bold ${accentColor} mb-6 flex items-center`}
                    style={{ fontFamily: "serif" }}>
                  <span className="mr-3 text-3xl">★</span>
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
                      className="flex items-start"
                    >
                      <span className={`${accentColor} mr-3 mt-1 font-bold`}>▸</span>
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
        </motion.div>
      </div>
    </section>
  );
}

