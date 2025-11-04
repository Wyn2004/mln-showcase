"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChartCVS from "@/components/ChartCVS";
import { computeSurplus, formatPercent } from "@/lib/utils/statistics";
import { motion } from "motion/react";

export default function Page() {
    const [c, setC] = useState<string>("");
    const [v, setV] = useState<string>("");
    const [s, setS] = useState<string>("");
    const [total, setTotal] = useState<string>("");
    const [wage, setWage] = useState<string>("");
    const [mode, setMode] = useState<"bar" | "pie">("bar");

    const result = useMemo(() => {
        return computeSurplus({
            c: Number(c) || 0,
            v: Number(v) || 0,
            s: s.trim() !== "" ? Number(s) : undefined,
            totalProductValue: total.trim() !== "" ? Number(total) : undefined,
            wage: wage.trim() !== "" ? Number(wage) : undefined,
        });
    }, [c, v, s, total, wage]);

    const nf = new Intl.NumberFormat();

    const loadSample = async () => {
        const res = await fetch("/sample/surplus.json");
        const data = await res.json();
        setC(String(data.c ?? 100));
        setV(String(data.v ?? 100));
        setS(String(data.s ?? 50));
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background with image - applied to full page */}
            <div className="fixed inset-0 -z-10">
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

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="container mx-auto max-w-5xl px-4 py-8 space-y-6 relative z-10"
            >
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>
                        Giá Trị Thặng Dư
                    </h1>
                    <p className="text-amber-200/80 text-base leading-relaxed max-w-3xl" style={{ fontFamily: "serif" }}>
                        Trong học thuyết của Marx, {"c"} là tư bản bất biến, {"v"} là tư bản khả biến và {"s"} là giá trị thặng dư.
                        Tỷ suất thặng dư s' = s / v; Tỷ suất lợi nhuận p' = s / (c + v).
                    </p>
                </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Nhập dữ liệu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm text-amber-200/80 mb-2 block">c (tư bản bất biến)</label>
                                <Input 
                                    value={c} 
                                    onChange={(e) => setC(e.target.value)} 
                                    placeholder="vd. 100"
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-amber-200/80 mb-2 block">v (tư bản khả biến)</label>
                                <Input 
                                    value={v} 
                                    onChange={(e) => setV(e.target.value)} 
                                    placeholder="vd. 100"
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-amber-200/80 mb-2 block">s (giá trị thặng dư) — tuỳ chọn</label>
                                <Input 
                                    value={s} 
                                    onChange={(e) => setS(e.target.value)} 
                                    placeholder="vd. 50"
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-amber-200/80 mb-2 block">Tổng giá trị sản phẩm (thay cho s)</label>
                                <Input 
                                    value={total} 
                                    onChange={(e) => setTotal(e.target.value)} 
                                    placeholder="vd. 250"
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-amber-200/80 mb-2 block">Tiền lương (thay cho s)</label>
                                <Input 
                                    value={wage} 
                                    onChange={(e) => setWage(e.target.value)} 
                                    placeholder="vd. 200"
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Button 
                                onClick={loadSample}
                                className="bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-600/50"
                            >
                                Tải dữ liệu mẫu
                            </Button>
                            <button 
                                className="px-3 py-2 rounded-lg border border-amber-700/30 bg-[#1a1208]/60 text-amber-200/80 hover:bg-[#1a1208]/80 hover:text-amber-200 text-sm transition-colors" 
                                onClick={() => setMode((m) => (m === "bar" ? "pie" : "bar"))}
                            >
                                {mode === "bar" ? "Chuyển sang Pie" : "Chuyển sang Bar"}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Giá trị thặng dư (s)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-amber-300">{nf.format(result.s)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Tỷ suất thặng dư (s')</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.sPrime === undefined ? (
                            <div className="text-sm text-amber-200/60">Không xác định (v = 0)</div>
                        ) : (
                            <div className="text-3xl font-semibold text-amber-300">{formatPercent(result.sPrime)}</div>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Tỷ suất lợi nhuận (p')</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.pPrime === undefined ? (
                            <div className="text-sm text-amber-200/60">Không xác định (c + v = 0)</div>
                        ) : (
                            <div className="text-3xl font-semibold text-amber-300">{formatPercent(result.pPrime)}</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {result.errors.length > 0 && (
                <div className="rounded-lg border border-amber-700/50 bg-amber-900/30 p-4 text-sm text-amber-200">
                    {result.errors.join("; ")}
                </div>
            )}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Biểu đồ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartCVS c={result.c} v={result.v} s={result.s} mode={mode} />
                    </CardContent>
                </Card>
            </motion.div>
            </motion.div>
        </div>
    );
}


