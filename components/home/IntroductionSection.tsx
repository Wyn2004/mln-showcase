"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, DollarSign } from "lucide-react";

export default function IntroductionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-32"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6" style={{ fontFamily: "serif" }}>
              Giới Thiệu Về Chủ Nghĩa Mác-Lênin
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-amber-700/30 shadow-2xl">
                <div className="relative h-96 bg-gradient-to-br from-red-900/40 to-red-800/40">
                  <Image
                    src="/image/Karl Marx thời kỳ công nghiệp hóa.png"
                    alt="Karl Marx trong thời kỳ công nghiệp hóa"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">Karl Marx</h3>
                    <p className="text-sm opacity-90">1818-1883</p>
                    <div className="h-0.5 w-16 bg-amber-400 mt-2" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-200 text-base leading-relaxed">
                    Nhà triết học, kinh tế học và nhà cách mạng người Đức. Marx đã phát triển học thuyết về
                    <strong className="text-amber-300"> giá trị thặng dư</strong> và <strong className="text-amber-300">đấu tranh giai cấp</strong>, làm nền tảng cho
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
              <Card className="overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-amber-700/30 shadow-2xl">
                <div className="relative h-96 bg-gradient-to-br from-red-900/40 to-red-800/40">
                  <Image
                    src="/image/Lenin trong thời kỳ cách mạng.png"
                    alt="Lenin trong thời kỳ cách mạng"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">Vladimir Lenin</h3>
                    <p className="text-sm opacity-90">1870-1924</p>
                    <div className="h-0.5 w-16 bg-amber-400 mt-2" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-200 text-base leading-relaxed">
                    Nhà cách mạng và lý luận gia người Nga. Lenin đã phát triển học thuyết về
                    <strong className="text-amber-300"> chủ nghĩa đế quốc</strong> và <strong className="text-amber-300">cách mạng vô sản</strong>,
                    áp dụng chủ nghĩa Mác vào thực tiễn cách mạng.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-12 text-center text-amber-100" style={{ fontFamily: "serif" }}>
              Các Nguyên Lý Cơ Bản
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-xl border-2 border-amber-700/20 shadow-xl hover:border-amber-600/40 transition-all"
              >
                <div className="mb-4">
                  <Globe className="w-12 h-12 text-amber-400" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-amber-200">
                  Vật Chất Quyết Định Ý Thức
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Tồn tại xã hội quyết định ý thức xã hội. Quan hệ sản xuất là cơ sở của mọi quan hệ xã hội khác.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-xl border-2 border-amber-700/20 shadow-xl hover:border-amber-600/40 transition-all"
              >
                <div className="mb-4">
                  <Users className="w-12 h-12 text-amber-400" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-amber-200">
                  Đấu Tranh Giai Cấp
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Lịch sử của mọi xã hội có giai cấp là lịch sử đấu tranh giai cấp giữa giai cấp bóc lột và bị bóc lột.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-xl border-2 border-amber-700/20 shadow-xl hover:border-amber-600/40 transition-all"
              >
                <div className="mb-4">
                  <DollarSign className="w-12 h-12 text-amber-400" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-amber-200">
                  Giá Trị Thặng Dư
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Nguồn gốc của lợi nhuận trong chủ nghĩa tư bản là việc bóc lột giá trị thặng dư từ lao động của công nhân.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
