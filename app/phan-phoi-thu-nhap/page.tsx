"use client";

import React, { useMemo, useRef, useState } from "react";
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
            className="cursor-pointer select-none"
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
                {sortKey === key ? <span>{sortAsc ? "▲" : "▼"}</span> : null}
            </div>
        </th>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="container mx-auto max-w-6xl px-4 py-6 space-y-6"
        >
            <h1 className="text-2xl font-bold">Phân phối thu nhập</h1>
            <p className="text-sm text-muted-foreground">
                Đường Lorenz mô tả phần trăm thu nhập tích lũy theo phần trăm dân số. Hệ số Gini (0–1)
                đo lường mức độ bất bình đẳng: càng gần 1 càng bất bình đẳng.
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>Nhập dữ liệu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <textarea
                            className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm"
                            placeholder="Dán danh sách thu nhập (số), ngăn cách bởi dấu phẩy/dòng; hoặc JSON mảng..."
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                        <div className="space-y-2">
                            <div className="flex gap-2 items-center">
                                <Button onClick={loadSample}>Tải dữ liệu mẫu</Button>
                                <button
                                    className="px-3 py-2 rounded-md border text-sm"
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
                                />
                                <Button onClick={exportTableCSV}>Xuất CSV</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Tổng thu nhập: <b>{new Intl.NumberFormat().format(totalIncome)}</b>
                            </div>
                        </div>
                    </div>

                    <div ref={tableRef} className="overflow-auto rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr className="text-left">
                                    {headerCell("index", "#")}
                                    {headerCell("income", "Thu nhập")}
                                    {headerCell("share", "Tỷ phần")}
                                    {headerCell("cumulativeShare", "Tích lũy")}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSortedRows.map((r) => (
                                    <tr key={r.index} className="border-t">
                                        <td className="p-2">{r.index}</td>
                                        <td className="p-2">{new Intl.NumberFormat().format(r.income)}</td>
                                        <td className="p-2">{normalize ? formatPercent(r.share) : r.share.toFixed(4)}</td>
                                        <td className="p-2">
                                            {normalize ? formatPercent(r.cumulativeShare) : r.cumulativeShare.toFixed(4)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="inline-flex items-center gap-2">
                                Hệ số Gini
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="inline-block w-4 h-4 rounded-full bg-muted cursor-help text-center leading-4">i</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        0: bình đẳng tuyệt đối; 1: bất bình đẳng tuyệt đối
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{gini.toFixed(3)}</div>
                        <div className="text-xs text-muted-foreground mt-1" title="Gini đo mức bất bình đẳng. 0: bình đẳng tuyệt đối; 1: bất bình đẳng tuyệt đối.">
                            Gini đo mức bất bình đẳng (0–1).
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Top 10% share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{formatPercent(top10)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Bottom 40% share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{formatPercent(bottom40)}</div>
                    </CardContent>
                </Card>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Biểu đồ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                        <ChartLorenz data={lorenz} />
                        <div>
                            <h3 className="text-base font-medium mb-2">Thu nhập theo nhóm (decile)</h3>
                            <div className="grid grid-cols-10 gap-1">
                                {deciles.map((d) => (
                                    <div key={d.label} className="space-y-1">
                                        <div className="text-xs text-muted-foreground text-center">{d.label}</div>
                                        <div className="h-24 w-full bg-muted relative">
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-blue-500"
                                                style={{ height: `${Math.min(100, d.share * 100 * 2)}%` }}
                                                title={`${d.label}: ${formatPercent(d.share)} }`}
                                            />
                                        </div>
                                        <div className="text-[11px] text-center">{formatPercent(d.share)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}


