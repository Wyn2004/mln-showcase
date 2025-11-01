"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Title with Retro Style */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 px-8 py-4 border-4 border-red-600 bg-yellow-100 relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(220, 38, 38, 0.3)"
                }}>
                {introduction.title}
              </h2>
              <div className="absolute -top-3 -left-3 text-yellow-500 text-4xl">★</div>
              <div className="absolute -bottom-3 -right-3 text-yellow-500 text-4xl">★</div>
            </div>
          </div>

          {/* Alert Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Alert className="border-4 border-red-600 bg-red-50"
              style={{ boxShadow: "6px 6px 0px rgba(220, 38, 38, 0.3)" }}>
              <BookOpen className="h-5 w-5 text-red-700" />
              <AlertTitle className="text-red-800 font-bold text-xl" style={{ fontFamily: "serif" }}>
                Lưu ý quan trọng
              </AlertTitle>
              <AlertDescription className="text-gray-800 text-base leading-relaxed" style={{ fontFamily: "serif" }}>
                Bài viết này phân tích hai hệ thống kinh tế-xã hội từ góc độ lý thuyết Mác-Lênin.
                Hãy tương tác với các phần tử để khám phá thêm thông tin chi tiết!
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Content with Vintage Paper Style */}
          <div className="bg-amber-50 border-4 border-amber-800 p-8 md:p-12 relative"
            style={{
              boxShadow: "12px 12px 0px rgba(120, 53, 15, 0.2)",
              backgroundImage: `linear-gradient(rgba(255,251,235,0.9), rgba(255,251,235,0.9)), 
                                   repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`
            }}>

            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-red-600"></div>

            <div className="space-y-6">
              {introduction.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-lg leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:mr-2 first-letter:float-left"
                  style={{ fontFamily: "serif", textAlign: "justify" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Decorative Images */}
            <div className="mt-8 flex justify-center gap-4">
              <motion.div
                initial={{ rotate: -5, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="relative w-24 h-24 border-4 border-amber-900"
                style={{ boxShadow: "4px 4px 0px rgba(120, 53, 15, 0.3)" }}
              >
                <Image
                  src="/images/lummi/mln1.png"
                  alt="Historical imagery"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ rotate: 5, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="relative w-24 h-24 border-4 border-amber-900"
                style={{ boxShadow: "4px 4px 0px rgba(120, 53, 15, 0.3)" }}
              >
                <Image
                  src="/images/lummi/mln2.png"
                  alt="Historical imagery"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

