"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-t-4 border-red-600"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-red-600 rounded-full p-2">
                                <span className="text-white font-bold text-lg">⚒</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Kinh Tế Chính Trị</h3>
                                <p className="text-red-300 text-sm font-medium">Mác - Lênin</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mb-4 max-w-md">
                            Website học tập về các nguyên lý cơ bản của chủ nghĩa Mác-Lênin,
                            tập trung vào phân phối thu nhập và giá trị thặng dư trong nền kinh tế chính trị.
                        </p>
                        <div className="bg-red-600/20 rounded-lg p-3 max-w-md">
                            <p className="text-red-200 text-sm italic">
                                "Tri thức là sức mạnh, nhưng chỉ khi được áp dụng vào thực tiễn cách mạng"
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Nội Dung Học Tập</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/phan-phoi-thu-nhap" className="text-slate-300 hover:text-red-300 transition-colors">
                                    📊 Phân Phối Thu Nhập
                                </Link>
                            </li>
                            <li>
                                <Link href="/gia-tri-thang-du" className="text-slate-300 hover:text-red-300 transition-colors">
                                    ⚙️ Giá Trị Thặng Dư
                                </Link>
                            </li>
                            <li>
                                <span className="text-slate-300">📈 Đường Lorenz</span>
                            </li>
                            <li>
                                <span className="text-slate-300">📊 Hệ Số Gini</span>
                            </li>
                        </ul>
                    </div>

                    {/* Principles */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Nguyên Lý Cơ Bản</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-slate-300">
                                <span className="text-red-400 font-semibold">•</span> Vật chất quyết định ý thức
                            </li>
                            <li className="text-slate-300">
                                <span className="text-red-400 font-semibold">•</span> Đấu tranh giai cấp
                            </li>
                            <li className="text-slate-300">
                                <span className="text-red-400 font-semibold">•</span> Giá trị thặng dư
                            </li>
                            <li className="text-slate-300">
                                <span className="text-red-400 font-semibold">•</span> Cách mạng vô sản
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-slate-400 text-sm mb-4 md:mb-0">
                            <p>© 2024 Website Học Tập Kinh Tế Chính Trị Mác-Lênin</p>
                            <p className="text-xs mt-1">
                                Được xây dựng với Next.js, TypeScript, Tailwind CSS và Framer Motion
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-red-600/20 rounded-lg px-3 py-1">
                                <span className="text-red-200 text-xs font-medium">
                                    "Lao động của thế giới, đoàn kết lại!"
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educational Quote */}
                <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-lg p-6 max-w-4xl mx-auto">
                        <blockquote className="text-red-100 italic text-lg mb-2">
                            "Triết học của các nhà triết học chỉ là cách giải thích thế giới theo những cách khác nhau,
                            nhưng vấn đề là thay đổi thế giới."
                        </blockquote>
                        <cite className="text-red-300 text-sm">— Karl Marx</cite>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
