"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface PipelineChartProps {
  data: { stage: string; count: number }[];
}

export default function PipelineChart({ data }: PipelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E2D8" />
        <XAxis
          dataKey="stage"
          tick={{ fontSize: 11, fill: "#74726A", fontWeight: 600, fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#74726A", fontWeight: 600, fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(118, 159, 205, 0.08)" }}
          contentStyle={{
            backgroundColor: "#141413",
            borderRadius: "12px",
            border: "1px solid #2A2A28",
            color: "#FFFFFF",
            fontSize: "12px",
            fontFamily: "var(--font-mono, monospace)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
          itemStyle={{ color: "#769FCD" }}
        />
        <Bar dataKey="count" fill="#769FCD" radius={[6, 6, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}
