"use client";

import React, { useRef, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { toPng } from "html-to-image";

export default function ChartCVS({
    c,
    v,
    s,
    mode = "bar",
    title = "Cấu phần c – v – s",
}: {
    c: number;
    v: number;
    s: number;
    mode?: "bar" | "pie";
    title?: string;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState(false);
    const data = [{ name: "Giá trị", c, v, s }];
    const pieData = [
        { name: "c", value: c },
        { name: "v", value: v },
        { name: "s", value: s },
    ];
    const COLORS = ["#94a3b8", "#60a5fa", "#34d399"]; // c, v, s

    const exportPNG = async () => {
        if (!containerRef.current) return;
        setDownloading(true);
        try {
            const dataUrl = await toPng(containerRef.current, { pixelRatio: 2 });
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "cvs.png";
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
                    {mode === "bar" ? (
                        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="c" stackId="a" fill={COLORS[0]} name="c (tư bản bất biến)" />
                            <Bar dataKey="v" stackId="a" fill={COLORS[1]} name="v (tư bản khả biến)" />
                            <Bar dataKey="s" stackId="a" fill={COLORS[2]} name="s (giá trị thặng dư)" />
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}


