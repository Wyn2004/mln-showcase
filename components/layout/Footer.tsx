"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { BookOpen, ChartLine, Settings, Scale } from "lucide-react";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#130E07] text-amber-100 border-t border-amber-700/30"
        >
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-amber-700/50 rounded-full p-2">
                                <BookOpen className="w-5 h-5 text-amber-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-amber-100" style={{ fontFamily: "serif" }}>Kinh Tế Chính Trị</h3>
                                <p className="text-amber-400/80 text-sm">Mác - Lênin</p>
                            </div>
                        </div>
                        <p className="text-amber-200/70 text-sm mb-4 max-w-md leading-relaxed">
                            Website học tập về các nguyên lý cơ bản của chủ nghĩa Mác-Lênin,
                            tập trung vào phân phối thu nhập và giá trị thặng dư trong nền kinh tế chính trị.
                        </p>
                        <div className="bg-[#1a1208]/60 border border-amber-700/30 rounded-lg p-3 max-w-md">
                            <p className="text-amber-200/80 text-sm italic" style={{ fontFamily: "serif" }}>
                                "Tri thức là sức mạnh, nhưng chỉ khi được áp dụng vào thực tiễn cách mạng"
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>Nội Dung Học Tập</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/phan-phoi-thu-nhap" className="flex items-center gap-2 text-amber-200/70 hover:text-amber-300 transition-colors text-sm">
                                    <ChartLine className="w-4 h-4" />
                                    Phân Phối Thu Nhập
                                </Link>
                            </li>
                            <li>
                                <Link href="/gia-tri-thang-du" className="flex items-center gap-2 text-amber-200/70 hover:text-amber-300 transition-colors text-sm">
                                    <Settings className="w-4 h-4" />
                                    Giá Trị Thặng Dư
                                </Link>
                            </li>
                            <li>
                                <Link href="/so-sanh-tbcn-xhcn" className="flex items-center gap-2 text-amber-200/70 hover:text-amber-300 transition-colors text-sm">
                                    <Scale className="w-4 h-4" />
                                    So Sánh TBCN & XHCN
                                </Link>
                            </li>
                            <li>
                                <span className="flex items-center gap-2 text-amber-200/50 text-sm">
                                    <ChartLine className="w-4 h-4" />
                                    Đường Lorenz
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Principles */}
                    <div>
                        <h4 className="text-lg font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>Nguyên Lý Cơ Bản</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-amber-200/70">
                                <span className="text-amber-400 mr-2">•</span> Vật chất quyết định ý thức
                            </li>
                            <li className="text-amber-200/70">
                                <span className="text-amber-400 mr-2">•</span> Đấu tranh giai cấp
                            </li>
                            <li className="text-amber-200/70">
                                <span className="text-amber-400 mr-2">•</span> Giá trị thặng dư
                            </li>
                            <li className="text-amber-200/70">
                                <span className="text-amber-400 mr-2">•</span> Cách mạng vô sản
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-amber-700/20 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-amber-200/60 text-sm text-center md:text-left">
                            <p>© 2024 Website Học Tập Kinh Tế Chính Trị Mác-Lênin</p>
                            <p className="text-xs mt-1 text-amber-200/40">
                                Được xây dựng với Next.js, TypeScript, Tailwind CSS và Framer Motion
                            </p>
                        </div>

                        <div className="bg-[#1a1208]/60 border border-amber-700/30 rounded-lg px-4 py-2">
                            <span className="text-amber-200/80 text-xs font-medium" style={{ fontFamily: "serif" }}>
                                "Lao động của thế giới, đoàn kết lại!"
                            </span>
                        </div>
                    </div>
                </div>

                {/* Educational Quote */}
                <div className="mt-8 text-center">
                    <div className="bg-[#1a1208]/60 border border-amber-700/30 rounded-lg p-6 max-w-4xl mx-auto">
                        <blockquote className="text-amber-100/90 italic text-base mb-2 leading-relaxed" style={{ fontFamily: "serif" }}>
                            "Triết học của các nhà triết học chỉ là cách giải thích thế giới theo những cách khác nhau,
                            nhưng vấn đề là thay đổi thế giới."
                        </blockquote>
                        <cite className="text-amber-300/80 text-sm">— Karl Marx</cite>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
