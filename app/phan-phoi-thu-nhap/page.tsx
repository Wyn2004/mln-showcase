"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChartLorenz from "@/components/ChartLorenz";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { motion } from "motion/react";
import {
    computeGini,
    computeLorenz,
    computeShares,
    computeTotals,
    groupByQuantiles,
    sanitizeIncomes,
    toCSV,
    formatPercent,
} from "@/lib/utils/statistics";

type TableRow = { index: number; income: number; share: number; cumulativeShare: number };

export default function Page() {
    const [rawText, setRawText] = useState("");
    const [search, setSearch] = useState("");
    const [normalize, setNormalize] = useState(true);
    const [sortKey, setSortKey] = useState<keyof TableRow>("index");
    const [sortAsc, setSortAsc] = useState(true);
    const tableRef = useRef<HTMLDivElement | null>(null);

    const incomes = useMemo(() => {
        try {
            if (rawText.trim().startsWith("[")) {
                return sanitizeIncomes(JSON.parse(rawText));
            }
            // parse by separators
            const parts = rawText
                .split(/,|;|\s+/)
                .map((x) => x.trim())
                .filter(Boolean);
            return sanitizeIncomes(parts as any);
        } catch {
            return [];
        }
    }, [rawText]);

    const { totalIncome } = computeTotals(incomes);
    const gini = computeGini(incomes);
    const { top10, bottom40 } = computeShares(incomes);
    const lorenz = computeLorenz(incomes);
    const deciles = groupByQuantiles(incomes, 10);

    const rows: TableRow[] = useMemo(() => {
        const n = incomes.length;
        if (n === 0) return [];
        const total = totalIncome || 1;
        const sorted = [...incomes].sort((a, b) => a - b);
        let cum = 0;
        return sorted.map((inc, i) => {
            cum += inc;
            return {
                index: i + 1,
                income: inc,
                share: inc / total,
                cumulativeShare: cum / total,
            };
        });
    }, [incomes, totalIncome]);

    const filteredSortedRows = useMemo(() => {
        const term = search.trim().toLowerCase();
        let arr = rows.filter((r) =>
            term ? String(r.index).includes(term) || String(r.income).includes(term) : true
        );
        arr = arr.sort((a, b) => {
            const va = a[sortKey];
            const vb = b[sortKey];
            const cmp = va < (vb as any) ? -1 : va > (vb as any) ? 1 : 0;
            return sortAsc ? cmp : -cmp;
        });
        return arr;
    }, [rows, search, sortKey, sortAsc]);

    const exportTableCSV = () => {
        const data = filteredSortedRows.map((r) => ({
            index: r.index,
            income: r.income,
            share: r.share,
            cumulativeShare: r.cumulativeShare,
        }));
        const csv = toCSV(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "incomes.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadSample = async () => {
        const res = await fetch("/sample/incomes.json");
        const data = await res.json();
        setRawText(JSON.stringify(data));
    };

    const headerCell = (key: keyof TableRow, label: string) => (
        <th
            className="cursor-pointer select-none p-3 text-amber-200/90 hover:text-amber-200 transition-colors"
            onClick={() => {
                if (sortKey === key) setSortAsc(!sortAsc);
                else {
                    setSortKey(key);
                    setSortAsc(true);
                }
            }}
        >
            <div className="flex items-center gap-1">
                <span>{label}</span>
                {sortKey === key ? <span className="text-amber-400">{sortAsc ? "▲" : "▼"}</span> : null}
            </div>
        </th>
    );

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
                className="container mx-auto max-w-6xl px-4 py-8 space-y-6 relative z-10"
            >
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4" style={{ fontFamily: "serif" }}>
                    Phân Phối Thu Nhập
                </h1>
                <p className="text-amber-200/80 text-base leading-relaxed max-w-3xl" style={{ fontFamily: "serif" }}>
                    Đường Lorenz mô tả phần trăm thu nhập tích lũy theo phần trăm dân số. Hệ số Gini (0–1)
                    đo lường mức độ bất bình đẳng: càng gần 1 càng bất bình đẳng.
                </p>
            </div>

            <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                <CardHeader>
                    <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Nhập dữ liệu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea
                            className="min-h-32 w-full rounded-lg border border-amber-700/30 bg-[#1a1208]/60 text-amber-100 placeholder:text-amber-400/50 p-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                            placeholder="Dán danh sách thu nhập (số), ngăn cách bởi dấu phẩy/dòng; hoặc JSON mảng..."
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                        <div className="space-y-3">
                            <div className="flex gap-2 items-center flex-wrap">
                                <Button 
                                    onClick={loadSample}
                                    className="bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-600/50"
                                >
                                    Tải dữ liệu mẫu
                                </Button>
                                <button
                                    className="px-3 py-2 rounded-lg border border-amber-700/30 bg-[#1a1208]/60 text-amber-200/80 hover:bg-[#1a1208]/80 hover:text-amber-200 text-sm transition-colors"
                                    onClick={() => setNormalize((v) => !v)}
                                >
                                    {normalize ? "Chuẩn hóa: Bật" : "Chuẩn hóa: Tắt"}
                                </button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Input
                                    placeholder="Tìm kiếm (theo index hoặc giá trị)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-[#1a1208]/60 border-amber-700/30 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-600/50"
                                />
                                <Button 
                                    onClick={exportTableCSV}
                                    className="bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-600/50"
                                >
                                    Xuất CSV
                                </Button>
                            </div>
                            <div className="text-sm text-amber-200/70">
                                Tổng thu nhập: <b className="text-amber-300">{new Intl.NumberFormat().format(totalIncome)}</b>
                            </div>
                        </div>
                    </div>

                    <div ref={tableRef} className="overflow-auto rounded-lg border border-amber-700/30">
                        <table className="w-full text-sm">
                            <thead className="bg-[#1a1208]/60">
                                <tr className="text-left">
                                    {headerCell("index", "#")}
                                    {headerCell("income", "Thu nhập")}
                                    {headerCell("share", "Tỷ phần")}
                                    {headerCell("cumulativeShare", "Tích lũy")}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSortedRows.map((r) => (
                                    <tr key={r.index} className="border-t border-amber-700/20 hover:bg-[#1a1208]/40 transition-colors">
                                        <td className="p-3 text-amber-200/80">{r.index}</td>
                                        <td className="p-3 text-amber-200/80">{new Intl.NumberFormat().format(r.income)}</td>
                                        <td className="p-3 text-amber-200/80">{normalize ? formatPercent(r.share) : r.share.toFixed(4)}</td>
                                        <td className="p-3 text-amber-200/80">
                                            {normalize ? formatPercent(r.cumulativeShare) : r.cumulativeShare.toFixed(4)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>
                            <div className="inline-flex items-center gap-2">
                                Hệ số Gini
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="inline-block w-4 h-4 rounded-full bg-amber-700/50 cursor-help text-center leading-4 text-amber-200 text-xs">i</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#130E07] border border-amber-700/30 text-amber-200">
                                        0: bình đẳng tuyệt đối; 1: bất bình đẳng tuyệt đối
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-amber-300">{gini.toFixed(3)}</div>
                        <div className="text-xs text-amber-200/60 mt-2">
                            Gini đo mức bất bình đẳng (0–1).
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Top 10% share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-amber-300">{formatPercent(top10)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Bottom 40% share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-amber-300">{formatPercent(bottom40)}</div>
                    </CardContent>
                </Card>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                <Card className="bg-[#130E07]/60 backdrop-blur-sm border border-amber-700/30">
                    <CardHeader>
                        <CardTitle className="text-amber-100" style={{ fontFamily: "serif" }}>Biểu đồ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6">
                        <ChartLorenz data={lorenz} />
                        <div>
                            <h3 className="text-base font-medium mb-4 text-amber-200" style={{ fontFamily: "serif" }}>Thu nhập theo nhóm (decile)</h3>
                            <div className="grid grid-cols-10 gap-2">
                                {deciles.map((d) => (
                                    <div key={d.label} className="space-y-1">
                                        <div className="text-xs text-amber-200/70 text-center">{d.label}</div>
                                        <div className="h-24 w-full bg-[#1a1208]/60 border border-amber-700/20 rounded relative overflow-hidden">
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-600 to-amber-500 transition-all"
                                                style={{ height: `${Math.min(100, d.share * 100 * 2)}%` }}
                                                title={`${d.label}: ${formatPercent(d.share)}`}
                                            />
                                        </div>
                                        <div className="text-[11px] text-center text-amber-200/70">{formatPercent(d.share)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            </motion.div>
        </div>
    );
}


