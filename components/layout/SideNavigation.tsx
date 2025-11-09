"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
    Home, 
    ChartLine, 
    Settings,
    Scale,
    BookOpen,
    Gamepad2,
    Sparkles,
    Menu,
    X
} from "lucide-react";

const navigationItems = [
    { path: "/", icon: Home, label: "Trang Chủ" },
    { path: "/phan-phoi-thu-nhap", icon: ChartLine, label: "Phân Phối Thu Nhập" },
    { path: "/gia-tri-thang-du", icon: Settings, label: "Giá Trị Thặng Dư" },
    { path: "/so-sanh-tbcn-xhcn", icon: Scale, label: "So Sánh TBCN & XHCN" },
    { path: "/quy-luat-gia-tri", icon: BookOpen, label: "Quy Luật Giá Trị" },
    { path: "/game", icon: Gamepad2, label: "Game" },
    { path: "/su-dung-ai", icon: Sparkles, label: "Sử Dụng AI" },
];

export default function SideNavigation() {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if desktop on mount and resize
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-8 top-1/2 -translate-y-1/2 z-30"
        >
            <div className="relative">
                {/* Mobile toggle button */}
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="md:hidden mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#130E07] to-[#1a1208] backdrop-blur-sm border border-amber-700/20 flex items-center justify-center text-amber-600/80 hover:text-amber-500/90 hover:border-amber-700/30 transition-all shadow-lg shadow-black/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.div>
                </motion.button>

                {/* Navigation items */}
                <AnimatePresence>
                    {(isExpanded || isDesktop) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="flex flex-col gap-2.5 bg-gradient-to-br from-[#130E07]/98 to-[#1a1208]/98 backdrop-blur-xl rounded-2xl p-2.5 border border-amber-800/20 shadow-2xl shadow-black/40"
                            style={{
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 193, 7, 0.05)"
                            }}
                        >
                            {navigationItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsExpanded(false)}
                                    >
                                        <motion.div
                                            className="relative w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer group"
                                            whileHover={{ scale: 1.05, x: 3 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ 
                                                delay: index * 0.04,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20
                                            }}
                                            title={item.label}
                                        >
                                            {/* Background với smooth transition */}
                                            <motion.div
                                                layoutId={`navBg-${item.path}`}
                                                className={`absolute inset-0 rounded-xl ${
                                                    isActive
                                                        ? "bg-gradient-to-br from-amber-800/40 to-amber-900/30 border border-amber-700/30"
                                                        : "bg-[#130E07]/60 border border-amber-800/10 group-hover:bg-[#1a1208]/80 group-hover:border-amber-700/20"
                                                }`}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 30,
                                                    duration: 0.5
                                                }}
                                                style={{
                                                    boxShadow: isActive 
                                                        ? "inset 0 1px 0 rgba(255, 193, 7, 0.1), 0 2px 8px rgba(180, 83, 9, 0.2)"
                                                        : "inset 0 1px 0 rgba(255, 193, 7, 0.02)"
                                                }}
                                            />

                                            {/* Icon với color transition */}
                                            <motion.div
                                                animate={{
                                                    color: isActive ? "rgba(251, 191, 36, 0.9)" : "rgba(217, 119, 6, 0.7)"
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="relative z-10"
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.div>

                                            {/* Active indicator - smooth sliding */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="absolute -left-1.5 w-1 h-10 bg-gradient-to-b from-amber-500 to-amber-600 rounded-r-full"
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    exit={{ scaleY: 0 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 25,
                                                        duration: 0.4
                                                    }}
                                                    style={{
                                                        boxShadow: "2px 0 8px rgba(251, 191, 36, 0.4), inset -1px 0 2px rgba(255, 255, 255, 0.1)"
                                                    }}
                                                />
                                            )}

                                            {/* Subtle glow effect for active */}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute inset-0 rounded-xl bg-amber-600/10 blur-sm -z-10"
                                                />
                                            )}

                                            {/* Hover tooltip */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -8, scale: 0.95 }}
                                                whileHover={{ opacity: 1, x: 0, scale: 1 }}
                                                className="absolute left-full ml-3 px-3 py-2 bg-gradient-to-br from-[#130E07] to-[#1a1208] text-amber-500/90 text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none border border-amber-700/30 shadow-xl z-50"
                                                style={{
                                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 193, 7, 0.1)"
                                                }}
                                            >
                                                {item.label}
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full border-4 border-transparent border-r-[#130E07]" />
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

