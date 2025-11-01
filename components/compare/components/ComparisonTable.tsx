"use client";

import { motion } from "framer-motion";
import { comparisonData } from "../data/data";

export default function ComparisonTable() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-4 inline-block px-8 py-4 border-4 border-red-600 bg-yellow-100"
                style={{ 
                  fontFamily: "serif",
                  boxShadow: "8px 8px 0px rgba(220, 38, 38, 0.3)"
                }}>
              SO SÁNH CỤ THỂ
            </h2>
            <p className="text-xl text-gray-700 mt-6" style={{ fontFamily: "serif" }}>
              Hai chế độ kinh tế - xã hội đối lập về bản chất
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full border-8 border-red-800 bg-amber-50"
                 style={{ boxShadow: "16px 16px 0px rgba(153, 27, 27, 0.2)" }}>
              
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white border-b-4 border-red-900">
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-4 border-red-900"
                     style={{ fontFamily: "serif" }}>
                  TIÊU CHÍ
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center border-r-4 border-red-900 bg-red-800"
                     style={{ fontFamily: "serif" }}>
                  TƯ BẢN CHỦ NGHĨA
                </div>
                <div className="p-4 md:p-6 font-bold text-lg md:text-xl text-center bg-red-900"
                     style={{ fontFamily: "serif" }}>
                  XÃ HỘI CHỦ NGHĨA
                </div>
              </div>

              {/* Table Body */}
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-3 border-b-4 border-red-800 ${
                    index % 2 === 0 ? "bg-amber-50" : "bg-yellow-50"
                  } hover:bg-yellow-100 transition-colors`}
                >
                  {/* Criteria */}
                  <div className="p-4 md:p-6 font-bold text-red-900 border-r-4 border-red-800 flex items-center"
                       style={{ fontFamily: "serif" }}>
                    <span className="text-red-600 mr-2 text-xl">▸</span>
                    {row.criteria}
                  </div>

                  {/* Capitalism */}
                  <div className="p-4 md:p-6 text-gray-800 border-r-4 border-red-800 flex items-center"
                       style={{ fontFamily: "serif" }}>
                    <div className="w-full">
                      <div className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">●</span>
                        <span>{row.capitalism}</span>
                      </div>
                    </div>
                  </div>

                  {/* Socialism */}
                  <div className="p-4 md:p-6 text-gray-800 flex items-center"
                       style={{ fontFamily: "serif" }}>
                    <div className="w-full">
                      <div className="flex items-start">
                        <span className="text-yellow-600 mr-2 mt-1">★</span>
                        <span>{row.socialism}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-red-900 to-red-800 border-4 border-yellow-400 p-8 text-center"
            style={{ boxShadow: "12px 12px 0px rgba(202, 138, 4, 0.3)" }}
          >
            <p className="text-xl md:text-2xl text-yellow-100 font-bold leading-relaxed"
               style={{ fontFamily: "serif" }}>
              Nếu TBCN là <span className="text-yellow-300">"đỉnh cao của chủ nghĩa bóc lột"</span>, 
              thì XHCN chính là <span className="text-yellow-300">hình thái xã hội mới</span>, 
              nơi con người thoát khỏi sự tha hóa, phát triển toàn diện cả vật chất và tinh thần.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

