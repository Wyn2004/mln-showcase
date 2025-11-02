"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

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
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 px-8 py-4 border-4 border-blue-600 bg-blue-50 relative"
                  style={{ 
                    fontFamily: "serif",
                    boxShadow: "8px 8px 0px rgba(37, 99, 235, 0.3)"
                  }}>
                Tổng Quan về Quy Luật Giá Trị
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
            <Alert className="border-4 border-blue-600 bg-blue-50"
              style={{ boxShadow: "6px 6px 0px rgba(37, 99, 235, 0.3)" }}>
              <Lightbulb className="h-5 w-5 text-blue-700" />
              <AlertTitle className="text-blue-800 font-bold text-xl" style={{ fontFamily: "serif" }}>
                Khái niệm cốt lõi
              </AlertTitle>
              <AlertDescription className="text-gray-800 text-base leading-relaxed" style={{ fontFamily: "serif" }}>
                Quy luật giá trị hoạt động như "bàn tay vô hình" điều tiết nền kinh tế thị trường.
                Hãy tương tác với các phần tử để khám phá chi tiết!
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Content */}
          <div className="bg-amber-50 border-4 border-amber-800 p-8 md:p-12 relative"
            style={{
              boxShadow: "12px 12px 0px rgba(146, 64, 14, 0.3)",
              backgroundImage: `linear-gradient(to bottom, rgba(255,251,235,0.9), rgba(254,243,199,0.9))`
            }}>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-600"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-600"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-600"></div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text */}
              <div>
                <p className="text-lg leading-relaxed text-gray-800 text-justify"
                   style={{ fontFamily: "serif" }}>
                  <span className="text-5xl font-bold text-blue-800 float-left mr-3 leading-none">Q</span>
                  {introduction.description}
                </p>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="border-8 border-blue-600 relative overflow-hidden"
                     style={{ boxShadow: "8px 8px 0px rgba(37, 99, 235, 0.4)" }}>
                  <Image
                    src="/images/lummi/mln1.png"
                    alt="Quy luật giá trị"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

