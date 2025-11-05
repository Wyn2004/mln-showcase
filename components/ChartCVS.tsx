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
    const COLORS = ["#F59E0B", "#D97706", "#FCD34D"]; // c, v, s - amber theme

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
                    {mode === "bar" ? (
                        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                            <XAxis 
                                dataKey="name" 
                                stroke="#D97706"
                                tick={{ fill: "#FCD34D", fontSize: 12 }}
                            />
                            <YAxis 
                                stroke="#D97706"
                                tick={{ fill: "#FCD34D", fontSize: 12 }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: "#130E07", 
                                    border: "1px solid #92400E",
                                    borderRadius: "8px",
                                    color: "#FCD34D"
                                }}
                                labelStyle={{ color: "#FCD34D" }}
                            />
                            <Legend 
                                wrapperStyle={{ color: "#FCD34D" }}
                            />
                            <Bar dataKey="c" stackId="a" fill={COLORS[0]} name="c (tư bản bất biến)" />
                            <Bar dataKey="v" stackId="a" fill={COLORS[1]} name="v (tư bản khả biến)" />
                            <Bar dataKey="s" stackId="a" fill={COLORS[2]} name="s (giá trị thặng dư)" />
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie 
                                data={pieData} 
                                dataKey="value" 
                                nameKey="name" 
                                outerRadius={110} 
                                label={{ fill: "#FCD34D", fontSize: 12 }}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: "#130E07", 
                                    border: "1px solid #92400E",
                                    borderRadius: "8px",
                                    color: "#FCD34D"
                                }}
                                labelStyle={{ color: "#FCD34D" }}
                            />
                            <Legend 
                                wrapperStyle={{ color: "#FCD34D" }}
                            />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}


