"use client";

import React, { useMemo, useState } from "react";
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
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="container mx-auto max-w-5xl px-4 py-6 space-y-6"
        >
            <h1 className="text-2xl font-bold">Giá trị thặng dư</h1>
            <p className="text-sm text-muted-foreground">
                Trong học thuyết của Marx, {"c"} là tư bản bất biến, {"v"} là tư bản khả biến và {"s"} là giá trị thặng dư.
                Tỷ suất thặng dư s' = s / v; Tỷ suất lợi nhuận p' = s / (c + v).
            </p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Nhập dữ liệu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label className="text-sm">c (tư bản bất biến)</label>
                                <Input value={c} onChange={(e) => setC(e.target.value)} placeholder="vd. 100" />
                            </div>
                            <div>
                                <label className="text-sm">v (tư bản khả biến)</label>
                                <Input value={v} onChange={(e) => setV(e.target.value)} placeholder="vd. 100" />
                            </div>
                            <div>
                                <label className="text-sm">s (giá trị thặng dư) — tuỳ chọn</label>
                                <Input value={s} onChange={(e) => setS(e.target.value)} placeholder="vd. 50" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm">Tổng giá trị sản phẩm (thay cho s)</label>
                                <Input value={total} onChange={(e) => setTotal(e.target.value)} placeholder="vd. 250" />
                            </div>
                            <div>
                                <label className="text-sm">Tiền lương (thay cho s)</label>
                                <Input value={wage} onChange={(e) => setWage(e.target.value)} placeholder="vd. 200" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={loadSample}>Tải dữ liệu mẫu</Button>
                            <button className="px-3 py-2 rounded-md border text-sm" onClick={() => setMode((m) => (m === "bar" ? "pie" : "bar"))}>
                                {mode === "bar" ? "Chuyển sang Pie" : "Chuyển sang Bar"}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Giá trị thặng dư (s)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{nf.format(result.s)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tỷ suất thặng dư (s')</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.sPrime === undefined ? (
                            <div className="text-sm text-muted-foreground">Không xác định (v = 0)</div>
                        ) : (
                            <div className="text-2xl font-semibold">{formatPercent(result.sPrime)}</div>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tỷ suất lợi nhuận (p')</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.pPrime === undefined ? (
                            <div className="text-sm text-muted-foreground">Không xác định (c + v = 0)</div>
                        ) : (
                            <div className="text-2xl font-semibold">{formatPercent(result.pPrime)}</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {result.errors.length > 0 && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {result.errors.join("; ")}
                </div>
            )}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Biểu đồ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartCVS c={result.c} v={result.v} s={result.s} mode={mode} />
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}


