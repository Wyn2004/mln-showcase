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
        <div className="w-full space-y-2" ref={containerRef}>
            <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">{title}</h3>
                <button
                    className="px-3 py-1.5 text-sm rounded-md bg-black text-white disabled:opacity-50"
                    onClick={exportPNG}
                    disabled={downloading}
                >
                    {downloading ? "Đang xuất..." : "Xuất PNG"}
                </button>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="x"
                            domain={[0, 100]}
                            type="number"
                            tickFormatter={(v) => `${v}%`}
                            label={{ value: "% dân số", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                            dataKey="y"
                            domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`}
                            label={{ value: "% thu nhập tích lũy", angle: -90, position: "insideLeft" }}
                        />
                        <ReTooltip formatter={(v: any) => `${v}%`} />
                        <ReferenceLine
                            // Đường bình đẳng 45°
                            segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]}
                            stroke="#999"
                            strokeDasharray="4 4"
                        />
                        <Line type="monotone" dataKey="y" stroke="#2563eb" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


