"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-red-700 shadow-lg border-b-4 border-red-800"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Title */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-white rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">⚒</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-xl group-hover:text-yellow-200 transition-colors">
                                Kinh Tế Chính Trị
                            </h1>
                            <p className="text-red-100 text-sm font-medium">
                                Mác - Lênin
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-white hover:text-yellow-200 transition-colors font-medium">
                            Trang Chủ
                        </Link>
                        <Link href="/phan-phoi-thu-nhap" className="text-white hover:text-yellow-200 transition-colors font-medium">
                            Phân Phối Thu Nhập
                        </Link>
                        <Link href="/gia-tri-thang-du" className="text-white hover:text-yellow-200 transition-colors font-medium">
                            Giá Trị Thặng Dư
                        </Link>
                        <Link href="/so-sanh-tbcn-xhcn" className="text-white hover:text-yellow-200 transition-colors font-medium">
                            So Sánh TBCN & XHCN
                        </Link>
                        <Link href="/quy-luat-gia-tri" className="text-white hover:text-yellow-200 transition-colors font-medium">
                            Quy Luật Giá Trị
                        </Link>
                        <Link href="/game" className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-4 py-2 rounded-lg font-bold transition-colors shadow-lg">
                            🎮 Game
                        </Link>
                        <div className="bg-white/20 rounded-lg px-3 py-1">
                            <span className="text-white text-sm font-medium">
                                "Tất cả mọi người đều bình đẳng"
                            </span>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white hover:text-yellow-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-red-500 py-4"
                    >
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-white hover:text-yellow-200 transition-colors font-medium px-2 py-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trang Chủ
                            </Link>
                            <Link
                                href="/phan-phoi-thu-nhap"
                                className="text-white hover:text-yellow-200 transition-colors font-medium px-2 py-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Phân Phối Thu Nhập
                            </Link>
                            <Link
                                href="/gia-tri-thang-du"
                                className="text-white hover:text-yellow-200 transition-colors font-medium px-2 py-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Giá Trị Thặng Dư
                            </Link>
                            <Link
                                href="/so-sanh-tbcn-xhcn"
                                className="text-white hover:text-yellow-200 transition-colors font-medium px-2 py-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                So Sánh TBCN & XHCN
                            </Link>
                            <Link
                                href="/quy-luat-gia-tri"
                                className="text-white hover:text-yellow-200 transition-colors font-medium px-2 py-1"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Quy Luật Giá Trị
                            </Link>
                            <Link
                                href="/game"
                                className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-4 py-2 rounded-lg font-bold transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                🎮 Game
                            </Link>
                            <div className="bg-white/20 rounded-lg px-3 py-2 mt-2">
                                <span className="text-white text-sm font-medium">
                                    "Tất cả mọi người đều bình đẳng"
                                </span>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
}
