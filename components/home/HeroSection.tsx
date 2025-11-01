"use client";


import { motion } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-screen w-full flex items-center justify-center"
        >
            {/* Background with image */}
            <div className="absolute inset-0">
                <Image
                    src="/backgroud/bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Dark overlay to darken the background */}
                <div className="absolute inset-0 bg-black/70" />
                {/* Additional vignette effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-6xl md:text-8xl font-bold text-amber-100 mb-8"
                    style={{
                        fontFamily: "serif",
                        textShadow: "4px 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(217,119,6,0.3)"
                    }}
                >
                    Kinh Tế Chính Trị
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-3xl md:text-5xl font-bold text-amber-200 mb-16 tracking-wider"
                    style={{
                        fontFamily: "serif",
                        textShadow: "3px 3px 6px rgba(0,0,0,0.5)"
                    }}
                >
                    CHỦ NGHĨA MÁC - LÊNIN
                </motion.h2>

                {/* Quote Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="relative"
                >
                    <div className="bg-amber-950/60 backdrop-blur-sm border-2 border-amber-700 rounded-xl p-8 md:p-12 max-w-2xl mx-auto relative overflow-hidden">
                        {/* Decorative corner accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

                        <p className="text-2xl md:text-3xl text-amber-100 italic leading-relaxed relative z-10" style={{ fontFamily: "serif" }}>
                            <span className="text-amber-400 text-5xl md:text-6xl leading-none">"</span>
                            Bạn cho rằng lịch sử có quy luật hay không?
                            <span className="text-amber-400 text-5xl md:text-6xl leading-none">"</span>
                        </p>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="cursor-pointer hover:text-amber-200 transition-colors"
                    >
                        <ChevronDown className="w-12 h-12 text-amber-300" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
