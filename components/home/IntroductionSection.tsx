"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, DollarSign } from "lucide-react";

export default function IntroductionSection() {
  return (
    <motion.section
      className="relative py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>
              Giới Thiệu Về Chủ Nghĩa Mác-Lênin
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all">
                <div className="relative h-80">
                  <Image
                    src="/image/Karl Marx thời kỳ công nghiệp hóa.png"
                    alt="Karl Marx trong thời kỳ công nghiệp hóa"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">Karl Marx</h3>
                    <p className="text-sm opacity-90">1818-1883</p>
                    <div className="h-0.5 w-12 bg-amber-400 mt-2" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-amber-100/90 text-sm leading-relaxed">
                    Nhà triết học, kinh tế học và nhà cách mạng người Đức. Marx đã phát triển học thuyết về
                    <strong className="text-amber-300"> giá trị thặng dư</strong> và <strong className="text-amber-300">đấu tranh giai cấp</strong>, làm nền tảng cho
                    chủ nghĩa xã hội khoa học.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30 hover:border-amber-600/50 transition-all">
                <div className="relative h-80">
                  <Image
                    src="/image/Lenin trong thời kỳ cách mạng.png"
                    alt="Lenin trong thời kỳ cách mạng"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">Vladimir Lenin</h3>
                    <p className="text-sm opacity-90">1870-1924</p>
                    <div className="h-0.5 w-12 bg-amber-400 mt-2" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-amber-100/90 text-sm leading-relaxed">
                    Nhà cách mạng và lý luận gia người Nga. Lenin đã phát triển học thuyết về
                    <strong className="text-amber-300"> chủ nghĩa đế quốc</strong> và <strong className="text-amber-300">cách mạng vô sản</strong>,
                    áp dụng chủ nghĩa Mác vào thực tiễn cách mạng.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-10 text-center text-amber-100" style={{ fontFamily: "serif" }}>
              Các Nguyên Lý Cơ Bản
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#130E07]/60 backdrop-blur-sm p-6 rounded-lg border border-amber-700/30 hover:border-amber-600/50 transition-all"
              >
                <div className="mb-3">
                  <Globe className="w-10 h-10 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-amber-200">
                  Vật Chất Quyết Định Ý Thức
                </h4>
                <p className="text-amber-100/80 text-sm leading-relaxed">
                  Tồn tại xã hội quyết định ý thức xã hội. Quan hệ sản xuất là cơ sở của mọi quan hệ xã hội khác.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#130E07]/60 backdrop-blur-sm p-6 rounded-lg border border-amber-700/30 hover:border-amber-600/50 transition-all"
              >
                <div className="mb-3">
                  <Users className="w-10 h-10 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-amber-200">
                  Đấu Tranh Giai Cấp
                </h4>
                <p className="text-amber-100/80 text-sm leading-relaxed">
                  Lịch sử của mọi xã hội có giai cấp là lịch sử đấu tranh giai cấp giữa giai cấp bóc lột và bị bóc lột.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#130E07]/60 backdrop-blur-sm p-6 rounded-lg border border-amber-700/30 hover:border-amber-600/50 transition-all"
              >
                <div className="mb-3">
                  <DollarSign className="w-10 h-10 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-amber-200">
                  Giá Trị Thặng Dư
                </h4>
                <p className="text-amber-100/80 text-sm leading-relaxed">
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
