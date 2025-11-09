"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Bot,
  Video,
  MessageSquare,
  Check,
  AlertTriangle,
  Target,
} from "lucide-react";

export default function AIUsedPage() {
  const [activeTab, setActiveTab] = useState("minh-bach");

  const aiTools = [
    {
      name: "Claude 4.5",
      icon: MessageSquare,
      description: "Hỗ trợ thiết kế, lập trình và tối ưu hóa code",
      link: "https://claude.ai",
    },
    {
      name: "Notebook LM",
      icon: Video,
      description: "Phân tích và tóm tắt nội dung video học tập",
      link: "https://notebooklm.google.com",
    },
    {
      name: "Gemini API",
      icon: Bot,
      description: "Tích hợp AI chatbot để trả lời câu hỏi học tập",
      link: "https://aistudio.google.com/api-keys",
    },
  ];

  const purposes = [
    "Hỗ trợ soạn câu hỏi trắc nghiệm và quiz ôn tập",
    "Gợi ý sơ đồ tư duy và cách trình bày nội dung",
    "Hỗ trợ lập trình và thiết kế giao diện web",
    "Tạo chatbot AI để giải đáp thắc mắc về nội dung học tập",
  ];

  const aiResults = [
    {
      icon: Check,
      text: "Tự thiết kế UI + sử dụng AI để thiết kế nhanh dựa trên base UI, tối ưu trải nghiệm người dùng",
    },
    {
      icon: Check,
      text: "Sử dụng AI để tóm tắt và trích xuất thông tin chính từ tài liệu",
    },
    {
      icon: Check,
      text: "Tích hợp AI chatbot để trả lời câu hỏi học tập dựa trên data training từ tài liệu chuẩn",
    },
    {
      icon: Check,
      text: "Vận dụng AI để phân tích video học tập và tạo nội dung tóm tắt",
    },
  ];

  const studentEdits = [
    {
      icon: AlertTriangle,
      text: "Rà soát, đối chiếu tất cả nội dung với giáo trình Kinh tế chính trị Mác-Lênin",
      details: "Kiểm tra tính chính xác của thông tin, công thức và khái niệm",
    },
    {
      icon: AlertTriangle,
      text: "Chỉnh sửa và bổ sung nội dung để phù hợp với chương trình học",
      details: "Điều chỉnh cách trình bày, thêm ví dụ minh họa thực tế",
    },
    {
      icon: AlertTriangle,
      text: "Kiểm tra và sửa lỗi code, đảm bảo tính ổn định của website",
      details: "Test các tính năng, tối ưu hiệu suất và sửa lỗi kỹ thuật",
    },
  ];

  const tabs = [
    {
      id: "minh-bach",
      label: "Minh bạch",
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          {/* Công cụ sử dụng */}
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Công cụ sử dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.a
                      key={tool.name}
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border-2 border-amber-700/30 bg-[#1a1208]/60 hover:bg-[#1a1208]/80 hover:border-amber-600/50 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-700/20 border border-amber-600/30">
                            <Icon className="w-5 h-5 text-amber-400" />
                          </div>
                          <span className="font-semibold text-amber-100">
                            {tool.name}
                          </span>
                        </div>
                        <Badge className="bg-amber-700/50 text-amber-100 text-xs group-hover:bg-amber-600/60 transition-colors opacity-0 group-hover:opacity-100">
                          Mở →
                        </Badge>
                      </div>
                      <p className="text-sm text-amber-200/70">
                        {tool.description}
                      </p>
                    </motion.a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mục đích */}
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mục đích
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {purposes.map((purpose, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-200/80">{purpose}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Kết quả AI */}
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Cách vận dụng AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiResults.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20"
                    >
                      <Icon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-amber-200/80 leading-relaxed">
                        {result.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chỉnh sửa của sinh viên */}
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Chỉnh sửa của sinh viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentEdits.map((edit, index) => {
                  const Icon = edit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-700/30"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-200/90 font-medium">
                          {edit.text}
                        </span>
                      </div>
                      <p className="text-sm text-amber-200/60 ml-8">
                        {edit.details}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "trach-nhiem",
      label: "Có trách nhiệm",
      icon: CheckCircle2,
      content: (
        <div className="space-y-6">
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Trách nhiệm sử dụng AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Kiểm tra và xác minh:
                  </strong>{" "}
                  Tất cả nội dung từ AI đều được rà soát kỹ lưỡng, đối chiếu với
                  giáo trình chính thức để đảm bảo tính chính xác.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Chỉnh sửa và bổ sung:
                  </strong>{" "}
                  Sinh viên đã chỉnh sửa, bổ sung và cải thiện nội dung từ AI để
                  phù hợp với mục tiêu học tập.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Minh bạch về nguồn:
                  </strong>{" "}
                  Trang này được tạo để minh bạch về cách sử dụng AI trong dự
                  án, giúp người chấm hiểu rõ quá trình làm việc.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "sang-tao",
      label: "Sáng tạo",
      icon: Lightbulb,
      content: (
        <div className="space-y-6">
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Sáng tạo trong ứng dụng AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80">
                  <strong className="text-amber-100">
                    Tích hợp AI Chatbot:
                  </strong>{" "}
                  Tạo chatbot thông minh để trả lời câu hỏi về Kinh tế chính trị
                  Mác-Lênin, giúp học viên học tập hiệu quả hơn.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80">
                  <strong className="text-amber-100">
                    Game học tập tương tác:
                  </strong>{" "}
                  Sử dụng AI để thiết kế game mô phỏng dây chuyền sản xuất, giúp
                  học viên hiểu rõ hơn về giá trị thặng dư.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80">
                  <strong className="text-amber-100">
                    Trực quan hóa dữ liệu:
                  </strong>{" "}
                  Ứng dụng AI để tạo biểu đồ và đồ thị trực quan, giúp học viên
                  dễ dàng hiểu các khái niệm phức tạp.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "liem-chinh",
      label: "Liêm chính học thuật",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Liêm chính học thuật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Công khai sử dụng AI:
                  </strong>{" "}
                  Trang này được tạo để minh bạch về việc sử dụng AI trong dự
                  án, tuân thủ nguyên tắc liêm chính học thuật.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Đảm bảo tính chính xác:
                  </strong>{" "}
                  Tất cả nội dung từ AI đều được kiểm tra, chỉnh sửa và xác minh
                  với giáo trình chính thức trước khi sử dụng.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1208]/40 border border-amber-700/20">
                <p className="text-amber-200/80 mb-3">
                  <strong className="text-amber-100">
                    Trách nhiệm của sinh viên:
                  </strong>{" "}
                  Sinh viên chịu trách nhiệm về nội dung cuối cùng, đã rà soát
                  và chỉnh sửa tất cả nội dung từ AI.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/backgroud/bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="container mx-auto max-w-6xl px-4 py-8 space-y-6 relative z-10"
      >
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-amber-100 mb-4"
            style={{ fontFamily: "serif" }}
          >
            Sử Dụng AI Trong Dự Án
          </h1>
          <p
            className="text-amber-200/80 text-base leading-relaxed max-w-3xl"
            style={{ fontFamily: "serif" }}
          >
            Trang này trình bày cách sử dụng AI trong dự án, đảm bảo tính minh
            bạch và liêm chính học thuật
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-700/50 h-auto p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-amber-700/80 data-[state=active]:text-amber-50 data-[state=inactive]:text-amber-300/70 font-bold text-sm md:text-base py-2 md:py-3 flex items-center justify-center gap-2"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(" ")[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
