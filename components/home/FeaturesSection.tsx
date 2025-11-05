"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine, Settings, TrendingUp, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="relative py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>
            Nội Dung Học Tập
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-amber-200 mb-2 flex items-center gap-2">
                  <ChartLine className="w-5 h-5 text-amber-400" />
                  Phân Phối Thu Nhập
                </CardTitle>
                <div className="h-0.5 w-12 bg-amber-500" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Khái Niệm Cơ Bản
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed">
                    Phân phối thu nhập là quá trình phân chia sản phẩm xã hội giữa các thành viên trong xã hội,
                    phản ánh quan hệ kinh tế và xã hội trong từng giai đoạn phát triển.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Đường Lorenz & Hệ Số Gini
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed">
                    Đường Lorenz mô tả mối quan hệ giữa phần trăm dân số và phần trăm thu nhập tích lũy.
                    Hệ số Gini (0-1) đo lường mức độ bất bình đẳng thu nhập.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Ý Nghĩa Chính Trị
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed">
                    Trong chủ nghĩa tư bản, phân phối thu nhập thể hiện sự bất bình đẳng do bóc lột giá trị thặng dư.
                    Trong chủ nghĩa xã hội, phân phối dựa trên nguyên tắc "làm theo năng lực, hưởng theo lao động".
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all">
              <div className="relative h-48">
                <Image
                  src="/image/Hình tượng giá trị thặng dư.png"
                  alt="Hình tượng giá trị thặng dư"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Giá Trị Thặng Dư
                  </h3>
                  <div className="h-0.5 w-12 bg-amber-400" />
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Định Nghĩa
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed">
                    Giá trị thặng dư là phần giá trị mới do lao động của công nhân tạo ra vượt quá giá trị sức lao động của họ,
                    bị nhà tư bản chiếm đoạt mà không trả công.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Công Thức Tính Toán
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed font-mono">
                    <strong className="text-amber-300">s' = s/v</strong> (Tỷ suất thặng dư)<br />
                    <strong className="text-amber-300">p' = s/(c+v)</strong> (Tỷ suất lợi nhuận)<br />
                    Trong đó: c = tư bản bất biến, v = tư bản khả biến, s = giá trị thặng dư
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                    Bản Chất Bóc Lột
                  </h4>
                  <p className="text-amber-100/80 text-xs leading-relaxed">
                    Việc chiếm đoạt giá trị thặng dư là cơ sở cho sự bóc lột trong chủ nghĩa tư bản và
                    nguồn gốc của tích lũy tư bản.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/quy-luat-gia-tri">
              <Card className="h-full bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-amber-200 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    Quy Luật Giá Trị
                  </CardTitle>
                  <div className="h-0.5 w-12 bg-amber-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Khái Niệm Cốt Lõi
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất hàng hóa, quy định việc sản xuất và
                      trao đổi hàng hóa phải căn cứ vào hao phí lao động xã hội cần thiết.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Các Yếu Tố (L, P, D, Q)
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      <strong className="text-amber-300">L</strong>: Lao động xã hội cần thiết<br />
                      <strong className="text-amber-300">P</strong>: Phức tạp lao động<br />
                      <strong className="text-amber-300">D</strong>: Cường độ lao động<br />
                      <strong className="text-amber-300">Q</strong>: Năng suất lao động
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Cơ Chế Hoạt Động
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      Giá cả dao động xoay quanh trục giá trị dưới tác động của quan hệ cung-cầu,
                      điều tiết sản xuất và phân phối trong nền kinh tế thị trường.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/game">
              <Card className="h-full bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-600 text-amber-50 px-3 py-1 text-xs font-bold rounded-bl-lg">
                  MỚI!
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-amber-200 mb-2 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-amber-400" />
                    Factory Shift Game
                  </CardTitle>
                  <div className="h-0.5 w-12 bg-amber-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Học Qua Chơi
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      Trải nghiệm game mô phỏng quản lý dây chuyền sản xuất. Học cách tính toán
                      giá trị thặng dư (s), tỷ suất thặng dư (m'), và tỷ suất lợi nhuận (p') một cách trực quan.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Quản Lý Sản Xuất
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      Điều chỉnh số công nhân, năng suất, tư bản để đạt mục tiêu. Hiểu rõ mối quan hệ
                      giữa các yếu tố L, P, D, Q và ảnh hưởng của chúng đến giá trị hàng hóa.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base text-amber-200 mb-1.5">
                      Thách Thức & Xếp Hạng
                    </h4>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      3 cấp độ khó tăng dần, hệ thống điểm và bảng xếp hạng. Cạnh tranh với bạn bè
                      để trở thành nhà quản lý dây chuyền giỏi nhất!
                    </p>
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



