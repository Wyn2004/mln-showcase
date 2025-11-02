"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6" style={{ fontFamily: "serif" }}>
            Nội Dung Học Tập
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-red-700/30 shadow-2xl hover:border-red-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 mb-2 flex items-center gap-3">
                  <ChartLine className="w-7 h-7" />
                  Phân Phối Thu Nhập
                </CardTitle>
                <div className="h-0.5 w-16 bg-red-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Khái Niệm Cơ Bản
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Phân phối thu nhập là quá trình phân chia sản phẩm xã hội giữa các thành viên trong xã hội,
                      phản ánh quan hệ kinh tế và xã hội trong từng giai đoạn phát triển.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Đường Lorenz & Hệ Số Gini
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Đường Lorenz mô tả mối quan hệ giữa phần trăm dân số và phần trăm thu nhập tích lũy.
                      Hệ số Gini (0-1) đo lường mức độ bất bình đẳng thu nhập.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Ý Nghĩa Chính Trị
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Trong chủ nghĩa tư bản, phân phối thu nhập thể hiện sự bất bình đẳng do bóc lột giá trị thặng dư.
                      Trong chủ nghĩa xã hội, phân phối dựa trên nguyên tắc "làm theo năng lực, hưởng theo lao động".
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-amber-700/30 shadow-2xl hover:border-amber-600/50 transition-all">
              <div className="relative h-64 bg-gradient-to-br from-amber-900/40 to-red-900/40">
                <Image
                  src="/image/Hình tượng giá trị thặng dư.png"
                  alt="Hình tượng giá trị thặng dư"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <Settings className="w-7 h-7" />
                    Giá Trị Thặng Dư
                  </h3>
                  <div className="h-0.5 w-16 bg-amber-400" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Định Nghĩa
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Giá trị thặng dư là phần giá trị mới do lao động của công nhân tạo ra vượt quá giá trị sức lao động của họ,
                      bị nhà tư bản chiếm đoạt mà không trả công.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Công Thức Tính Toán
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-mono">
                      <strong className="text-amber-300">s' = s/v</strong> (Tỷ suất thặng dư)<br />
                      <strong className="text-amber-300">p' = s/(c+v)</strong> (Tỷ suất lợi nhuận)<br />
                      Trong đó: c = tư bản bất biến, v = tư bản khả biến, s = giá trị thặng dư
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-amber-200 mb-2">
                      Bản Chất Bóc Lột
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Việc chiếm đoạt giá trị thặng dư là cơ sở cho sự bóc lột trong chủ nghĩa tư bản và
                      nguồn gốc của tích lũy tư bản.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/quy-luat-gia-tri">
              <Card className="h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-blue-700/30 shadow-2xl hover:border-blue-600/50 transition-all cursor-pointer hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-400 mb-2 flex items-center gap-3">
                    <TrendingUp className="w-7 h-7" />
                    Quy Luật Giá Trị
                  </CardTitle>
                  <div className="h-0.5 w-16 bg-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg text-amber-200 mb-2">
                        Khái Niệm Cốt Lõi
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất hàng hóa, quy định việc sản xuất và
                        trao đổi hàng hóa phải căn cứ vào hao phí lao động xã hội cần thiết.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-amber-200 mb-2">
                        Các Yếu Tố (L, P, D, Q)
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <strong className="text-blue-300">L</strong>: Lao động xã hội cần thiết<br />
                        <strong className="text-blue-300">P</strong>: Phức tạp lao động<br />
                        <strong className="text-blue-300">D</strong>: Cường độ lao động<br />
                        <strong className="text-blue-300">Q</strong>: Năng suất lao động
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-amber-200 mb-2">
                        Cơ Chế Hoạt Động
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Giá cả dao động xoay quanh trục giá trị dưới tác động của quan hệ cung-cầu,
                        điều tiết sản xuất và phân phối trong nền kinh tế thị trường.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
