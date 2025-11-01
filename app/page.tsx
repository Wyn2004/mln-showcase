"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skiper30 } from "@/components/ui/skiper-ui/skiper30";
import { Skiper52 } from "@/components/ui/skiper-ui/skiper52";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6"
        >
          Kinh Tế Chính Trị
          <span className="block text-red-600 dark:text-red-400">Mác - Lênin</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
        >
          Khám phá các nguyên lý cơ bản của chủ nghĩa Mác-Lênin về phân phối thu nhập và giá trị thặng dư
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/phan-phoi-thu-nhap">
            <Button size="lg" className="text-lg px-8 py-3">
              Phân Phối Thu Nhập
            </Button>
          </Link>
          <Link href="/gia-tri-thang-du">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Giá Trị Thặng Dư
            </Button>
          </Link>
          <Link href="/so-sanh-tbcn-xhcn">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-red-600 text-white hover:bg-red-700 border-red-700">
              So Sánh TBCN & XHCN
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
            Giới Thiệu Về Chủ Nghĩa Mác-Lênin
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-80 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                  <Image
                    src="/image/Karl Marx thời kỳ công nghiệp hóa.png"
                    alt="Karl Marx trong thời kỳ công nghiệp hóa"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Karl Marx</h3>
                    <p className="text-sm opacity-90">1818-1883</p>
                  </div>
                </div>
                <CardContent className="p-2">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Nhà triết học, kinh tế học và nhà cách mạng người Đức. Marx đã phát triển học thuyết về
                    <strong> giá trị thặng dư</strong> và <strong>đấu tranh giai cấp</strong>, làm nền tảng cho
                    chủ nghĩa xã hội khoa học.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-80 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                  <Image
                    src="/image/Lenin trong thời kỳ cách mạng.png"
                    alt="Lenin trong thời kỳ cách mạng"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Vladimir Lenin</h3>
                    <p className="text-sm opacity-90">1870-1924</p>
                  </div>
                </div>
                <CardContent className="p-2">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Nhà cách mạng và lý luận gia người Nga. Lenin đã phát triển học thuyết về
                    <strong> chủ nghĩa đế quốc</strong> và <strong>cách mạng vô sản</strong>,
                    áp dụng chủ nghĩa Mác vào thực tiễn cách mạng.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600 dark:text-slate-300">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
              Các Nguyên Lý Cơ Bản
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">
                  Vật Chất Quyết Định Ý Thức
                </h4>
                <p className="text-sm">
                  Tồn tại xã hội quyết định ý thức xã hội. Quan hệ sản xuất là cơ sở của mọi quan hệ xã hội khác.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">
                  Đấu Tranh Giai Cấp
                </h4>
                <p className="text-sm">
                  Lịch sử của mọi xã hội có giai cấp là lịch sử đấu tranh giai cấp giữa giai cấp bóc lột và bị bóc lột.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">
                  Giá Trị Thặng Dư
                </h4>
                <p className="text-sm">
                  Nguồn gốc của lợi nhuận trong chủ nghĩa tư bản là việc bóc lột giá trị thặng dư từ lao động của công nhân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-800 py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
            Nội Dung Học Tập
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600 dark:text-red-400">
                    📊 Phân Phối Thu Nhập
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Khái Niệm Cơ Bản
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Phân phối thu nhập là quá trình phân chia sản phẩm xã hội giữa các thành viên trong xã hội,
                      phản ánh quan hệ kinh tế và xã hội trong từng giai đoạn phát triển.
                    </p>

                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Đường Lorenz & Hệ Số Gini
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Đường Lorenz mô tả mối quan hệ giữa phần trăm dân số và phần trăm thu nhập tích lũy.
                      Hệ số Gini (0-1) đo lường mức độ bất bình đẳng thu nhập.
                    </p>

                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Ý Nghĩa Chính Trị
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Trong chủ nghĩa tư bản, phân phối thu nhập thể hiện sự bất bình đẳng do bóc lột giá trị thặng dư.
                      Trong chủ nghĩa xã hội, phân phối dựa trên nguyên tắc "làm theo năng lực, hưởng theo lao động".
                    </p>
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
              <Card className="h-full overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                  <Image
                    src="/image/Hình tượng giá trị thặng dư.png"
                    alt="Hình tượng giá trị thặng dư"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <h3 className="text-lg font-bold text-white">⚙️ Giá Trị Thặng Dư</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Định Nghĩa
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Giá trị thặng dư là phần giá trị mới do lao động của công nhân tạo ra vượt quá giá trị sức lao động của họ,
                      bị nhà tư bản chiếm đoạt mà không trả công.
                    </p>

                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Công Thức Tính Toán
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      <strong>s' = s/v</strong> (Tỷ suất thặng dư)<br />
                      <strong>p' = s/(c+v)</strong> (Tỷ suất lợi nhuận)<br />
                      Trong đó: c = tư bản bất biến, v = tư bản khả biến, s = giá trị thặng dư
                    </p>

                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Bản Chất Bóc Lột
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Việc chiếm đoạt giá trị thặng dư là cơ sở cho sự bóc lột trong chủ nghĩa tư bản và
                      nguồn gốc của tích lũy tư bản.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Historical Context Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
            Bối Cảnh Lịch Sử
          </h2>
          <div className="h-[600px] w-full">
            <Skiper52 />
          </div>
        </div>
      </motion.section>

      {/* Interactive Gallery Section */}
      <div className="relative">
        <Skiper30 />
      </div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">
          Bắt Đầu Học Tập Ngay Hôm Nay
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Khám phá các công cụ tương tác để hiểu sâu hơn về kinh tế chính trị Mác-Lênin
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/phan-phoi-thu-nhap">
            <Button size="lg" className="text-lg px-8 py-3">
              Khám Phá Phân Phối Thu Nhập
            </Button>
          </Link>
          <Link href="/gia-tri-thang-du">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Tính Toán Giá Trị Thặng Dư
            </Button>
          </Link>
        </div>
      </motion.section>

    </div>
  );
}
