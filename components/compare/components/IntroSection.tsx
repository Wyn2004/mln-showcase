"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-16 relative">
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
              <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-4 px-8 py-4 border border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm relative"
                style={{
                  fontFamily: "serif",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)"
                }}>
                {introduction.title}
              </h2>
            </div>
          </div>

          {/* Alert Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Alert className="border border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <BookOpen className="h-5 w-5 text-amber-300" />
              <AlertTitle className="text-amber-50 font-bold text-xl" style={{ fontFamily: "serif" }}>
                Lưu ý quan trọng
              </AlertTitle>
              <AlertDescription className="text-amber-100 text-base leading-relaxed" style={{ fontFamily: "serif" }}>
                Bài viết này phân tích hai hệ thống kinh tế-xã hội từ góc độ lý thuyết Mác-Lênin.
                Hãy tương tác với các phần tử để khám phá thêm thông tin chi tiết!
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Content with Vintage Paper Style */}
          <div className="bg-[#130E07]/90 backdrop-blur-sm border border-amber-700/50 p-8 md:p-12 relative"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)"
            }}>

            <div className="space-y-6">
              {introduction.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-lg leading-relaxed text-amber-100 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-300 first-letter:mr-2 first-letter:float-left"
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
                className="relative w-24 h-24 border border-amber-700/30 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}
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
                className="relative w-24 h-24 border border-amber-700/30 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}
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

