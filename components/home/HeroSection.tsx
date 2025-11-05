"use client";


import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

// Helper function to split text into characters for animation
const textToChars = (text: string) => {
    return text.split("").map((char, index) => {
        const delay = index * 0.1; // Wave delay between characters
        
        return (
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1
                }}
                transition={{
                    delay: 0.3 + index * 0.05,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
                className="inline-block"
                style={{
                    textShadow: "4px 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(217,119,6,0.3)"
                }}
            >
                <motion.span
                    animate={{
                        y: [0, -4, 0],
                        scale: [1, 1.02, 1],
                        filter: [
                            "brightness(1)",
                            "brightness(1.15)",
                            "brightness(1)"
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: delay,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                        willChange: "transform, filter"
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            </motion.span>
        );
    });
};

const textToCharsSubtitle = (text: string) => {
    return text.split("").map((char, index) => {
        const delay = index * 0.08; // Wave delay between characters
        
        return (
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                    delay: 0.6 + index * 0.03,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }}
                className="inline-block"
                style={{
                    textShadow: "3px 3px 6px rgba(0,0,0,0.5)"
                }}
            >
                <motion.span
                    animate={{
                        y: [0, -3, 0],
                        scale: [1, 1.015, 1],
                        filter: [
                            "brightness(1)",
                            "brightness(1.1)",
                            "brightness(1)"
                        ]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: delay,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                        willChange: "transform, filter"
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            </motion.span>
        );
    });
};

export default function HeroSection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-screen w-full flex items-center justify-center"
        >
            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Main Title */}
                <h1
                    className="text-6xl md:text-8xl font-bold text-amber-100 mb-8"
                    style={{
                        fontFamily: "serif"
                    }}
                >
                    {textToChars("Kinh Tế Chính Trị")}
                </h1>

                {/* Subtitle */}
                <h2
                    className="text-3xl md:text-5xl font-bold text-amber-200 mb-16 tracking-wider"
                    style={{
                        fontFamily: "serif"
                    }}
                >
                    {textToCharsSubtitle("CHỦ NGHĨA MÁC - LÊNIN")}
                </h2>

                {/* Quote Box - Simple & Elegant */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="relative max-w-xl mx-auto"
                >
                    <div className="relative bg-[#130E07]/80 backdrop-blur-sm border border-amber-700/30 rounded-lg px-6 py-5 md:px-8 md:py-6"
                        style={{
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 193, 7, 0.05)"
                        }}
                    >
                        <p className="text-lg md:text-xl text-amber-200/90 italic leading-relaxed text-center" 
                           style={{ 
                               fontFamily: "serif",
                               textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)"
                           }}
                        >
                            <span className="text-amber-500/80 text-3xl md:text-4xl leading-none mr-1.5" 
                                  style={{ fontFamily: "serif" }}
                            >
                                "
                            </span>
                            Bạn cho rằng lịch sử có quy luật hay không?
                            <span className="text-amber-500/80 text-3xl md:text-4xl leading-none ml-1.5"
                                  style={{ fontFamily: "serif" }}
                            >
                                "
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator - moved outside content container to avoid z-index issues */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{
                        y: [0, 12, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="cursor-pointer flex flex-col items-center gap-2 group"
                >
                    <ChevronDown className="w-10 h-10 text-amber-400/80 group-hover:text-amber-300 transition-colors drop-shadow-lg" />
                    <motion.div
                        animate={{
                            scale: [1, 0.8, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="h-8 w-0.5 bg-amber-400/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
