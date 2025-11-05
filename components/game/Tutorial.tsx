"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Users, TrendingUp, DollarSign, Award } from "lucide-react";

export default function Tutorial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-amber-100 flex items-center gap-3">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
            Hướng Dẫn Chơi Game
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Overview */}
          <div className="bg-[#1a1208]/60 p-4 md:p-6 rounded-lg border-2 border-amber-700/50">
            <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-4">Giới Thiệu</h3>
            <p className="text-amber-200/80 leading-relaxed">
              <strong className="text-amber-100">Factory Shift</strong> là game mô phỏng quản lý dây chuyền sản xuất dựa trên
              lý thuyết kinh tế chính trị Mác-Lênin. Bạn sẽ học cách tính toán{" "}
              <strong className="text-amber-100">giá trị thặng dư (s)</strong>, <strong className="text-amber-100">tỷ suất thặng dư (m')</strong>, và{" "}
              <strong className="text-amber-100">tỷ suất lợi nhuận (p')</strong> thông qua việc điều chỉnh các yếu tố sản xuất.
            </p>
          </div>

          {/* Game Objective */}
          <div className="bg-[#1a1208]/60 p-4 md:p-6 rounded-lg border-2 border-amber-700/50">
            <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6" />
              Mục Tiêu
            </h3>
            <ul className="space-y-2 text-amber-200/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span>
                  Đạt <strong className="text-amber-100">giá trị thặng dư (s)</strong> mục tiêu trong thời gian giới hạn
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>
                  Tối ưu hóa <strong className="text-amber-100">tỷ suất thặng dư (m')</strong> và{" "}
                  <strong className="text-amber-100">tỷ suất lợi nhuận (p')</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Hoàn thành càng nhanh để nhận điểm thưởng thời gian</span>
              </li>
            </ul>
          </div>

          {/* Controls */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="workers"
              className="bg-[#1a1208]/60 border-2 border-amber-700/50 rounded-lg px-4"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-amber-100 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                  Số Công Nhân (L)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-amber-200/80 pt-4">
                <p className="mb-3">
                  Điều chỉnh số lượng công nhân làm việc trên dây chuyền.
                </p>
                <div className="bg-[#130E07]/60 p-4 rounded-lg border-2 border-amber-700/30">
                  <p className="font-medium mb-2 text-amber-100">📊 Ảnh hưởng:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Tăng công nhân → Tăng giá trị sản phẩm</li>
                    <li>• Nhiều công nhân hơn → Cần tư bản khả biến (v) cao hơn</li>
                    <li>• Tối ưu: Cân bằng giữa số công nhân và năng suất</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="productivity"
              className="bg-[#1a1208]/60 border-2 border-amber-700/50 rounded-lg px-4"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-amber-100 hover:no-underline">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                  Năng Suất (P)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-amber-200/80 pt-4">
                <p className="mb-3">
                  Nâng cấp năng suất lao động để tăng hiệu quả sản xuất.
                </p>
                <div className="bg-[#130E07]/60 p-4 rounded-lg border-2 border-amber-700/30">
                  <p className="font-medium mb-2 text-amber-100">📊 Ảnh hưởng:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Tăng năng suất → Tăng giá trị sản phẩm mạnh mẽ</li>
                    <li>• Năng suất cao → Tăng giá trị thặng dư (s)</li>
                    <li>• Công thức: Giá trị = Cơ sở × L × P × Tỷ lệ làm việc</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="capital"
              className="bg-[#1a1208]/60 border-2 border-amber-700/50 rounded-lg px-4"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-amber-100 hover:no-underline">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                  Tư Bản (c & v)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-amber-200/80 pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-amber-300 mb-2">Tư Bản Bất Biến (c):</p>
                    <p className="text-sm mb-2">
                      Chi phí cho máy móc, nguyên vật liệu, công cụ sản xuất.
                    </p>
                    <Badge variant="outline" className="text-xs border-amber-700/50 text-amber-300 bg-[#130E07]/60">
                      Không tạo ra giá trị mới, chỉ chuyển giá trị vào sản phẩm
                    </Badge>
                  </div>
                  <div>
                    <p className="font-bold text-amber-300 mb-2">Tư Bản Khả Biến (v):</p>
                    <p className="text-sm mb-2">
                      Chi phí tiền lương cho công nhân.
                    </p>
                    <Badge variant="outline" className="text-xs border-amber-700/50 text-amber-300 bg-[#130E07]/60">
                      Tạo ra giá trị mới thông qua lao động
                    </Badge>
                  </div>
                  <div className="bg-[#130E07]/60 p-4 rounded-lg border-2 border-amber-700/30">
                    <p className="font-medium mb-2 text-amber-100">📐 Công thức:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong className="text-amber-100">s = Giá trị sản phẩm - c - v</strong></li>
                      <li>• <strong className="text-amber-100">m' = s / v × 100%</strong> (Tỷ suất thặng dư)</li>
                      <li>• <strong className="text-amber-100">p' = s / (c + v) × 100%</strong> (Tỷ suất lợi nhuận)</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="scoring"
              className="bg-[#1a1208]/60 border-2 border-amber-700/50 rounded-lg px-4"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-amber-100 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5" />
                  Hệ Thống Điểm
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-amber-200/80 pt-4">
                <div className="bg-[#130E07]/60 p-4 rounded-lg border-2 border-amber-700/30">
                  <p className="font-medium mb-3 text-amber-100">Cách tính điểm:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">+100</span>
                      <span>Đạt mục tiêu giá trị thặng dư (s)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">+50</span>
                      <span>Thưởng thời gian (tối đa nếu hoàn thành nhanh)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">+10</span>
                      <span>Mỗi hành động đúng</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">-2</span>
                      <span>Mỗi lần sử dụng gợi ý/cheat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">+Bonus</span>
                      <span>Vượt mục tiêu (mỗi 10 đơn vị thặng dư thêm = +1 điểm)</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Tips */}
          <div className="bg-[#1a1208]/60 p-4 md:p-6 rounded-lg border-2 border-amber-700/50">
            <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-4">💡 Mẹo Chơi</h3>
            <ul className="space-y-2 text-amber-200/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">★</span>
                <span>
                  <strong className="text-amber-100">Tăng năng suất (P)</strong> là cách hiệu quả nhất để tăng giá trị thặng dư
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">★</span>
                <span>
                  Giảm <strong className="text-amber-100">tư bản khả biến (v)</strong> sẽ tăng m' nhưng có thể giảm động lực công nhân
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">★</span>
                <span>
                  Cân bằng giữa <strong className="text-amber-100">số công nhân</strong> và <strong className="text-amber-100">năng suất</strong> để tối ưu
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">★</span>
                <span>
                  Theo dõi <strong className="text-amber-100">tỷ lệ làm việc</strong> - quá cao có thể làm giảm hiệu suất
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

