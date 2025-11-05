"use client";

import { motion } from "framer-motion";
import { introduction } from "../data/data";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-16">
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
              <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-4 px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm relative"
                  style={{ 
                    fontFamily: "serif",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                  }}>
                Tổng Quan về Quy Luật Giá Trị
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
            <Alert className="border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
              <Lightbulb className="h-5 w-5 text-amber-300" />
              <AlertTitle className="text-amber-50 font-bold text-xl" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                Khái niệm cốt lõi
              </AlertTitle>
              <AlertDescription className="text-amber-100 text-base leading-relaxed" style={{ fontFamily: "serif" }}>
                Quy luật giá trị hoạt động như "bàn tay vô hình" điều tiết nền kinh tế thị trường.
                Hãy tương tác với các phần tử để khám phá chi tiết!
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Content */}
          <div className="bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-600/50 p-8 md:p-12 relative"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)"
            }}>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text */}
              <div>
                <p className="text-lg leading-relaxed text-amber-100 text-justify"
                   style={{ fontFamily: "serif" }}>
                  <span className="text-5xl font-bold text-amber-300 float-left mr-3 leading-none">Q</span>
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
                <div className="border-2 border-amber-600/50 relative overflow-hidden rounded-lg"
                     style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}>
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

