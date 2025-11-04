"use client";

import React, { useMemo, useRef, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as ReTooltip,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { toPng } from "html-to-image";

export type LorenzDatum = { populationShare: number; incomeShare: number };

export default function ChartLorenz({
    data,
    title = "Đường Lorenz",
}: {
    data: LorenzDatum[];
    title?: string;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState(false);
    const chartData = useMemo(
        () =>
            data.map((d) => ({
                x: Math.round(d.populationShare * 1000) / 10,
                y: Math.round(d.incomeShare * 1000) / 10,
            })),
        [data]
    );

    const exportPNG = async () => {
        if (!containerRef.current) return;
        setDownloading(true);
        try {
            const dataUrl = await toPng(containerRef.current, { pixelRatio: 2 });
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "lorenz.png";
            a.click();
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="w-full space-y-3" ref={containerRef}>
            <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-amber-200" style={{ fontFamily: "serif" }}>{title}</h3>
                <button
                    className="px-3 py-1.5 text-sm rounded-lg bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-600/50 disabled:opacity-50 transition-colors"
                    onClick={exportPNG}
                    disabled={downloading}
                >
                    {downloading ? "Đang xuất..." : "Xuất PNG"}
                </button>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D97706" opacity={0.2} />
                        <XAxis
                            dataKey="x"
                            domain={[0, 100]}
                            type="number"
                            tickFormatter={(v) => `${v}%`}
                            label={{ value: "% dân số", position: "insideBottom", offset: -5 }}
                            stroke="#D97706"
                            tick={{ fill: "#FCD34D", fontSize: 12 }}
                        />
                        <YAxis
                            dataKey="y"
                            domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`}
                            label={{ value: "% thu nhập tích lũy", angle: -90, position: "insideLeft" }}
                            stroke="#D97706"
                            tick={{ fill: "#FCD34D", fontSize: 12 }}
                        />
                        <ReTooltip 
                            formatter={(v: any) => `${v}%`}
                            contentStyle={{ 
                                backgroundColor: "#130E07", 
                                border: "1px solid #92400E",
                                borderRadius: "8px",
                                color: "#FCD34D"
                            }}
                            labelStyle={{ color: "#FCD34D" }}
                        />
                        <ReferenceLine
                            // Đường bình đẳng 45°
                            segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]}
                            stroke="#D97706"
                            strokeDasharray="4 4"
                            opacity={0.5}
                        />
                        <Line type="monotone" dataKey="y" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


