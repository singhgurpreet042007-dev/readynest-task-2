"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6"];

export default function TaskStatusChart() {
  const [data, setData] = useState([
    { name: "Todo", value: 0 },
    { name: "In Progress", value: 0 },
    { name: "Completed", value: 0 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const res = await fetch("/api/task-stats");
    const stats = await res.json();

    setData([
      { name: "Todo", value: stats.todo || 0 },
      { name: "In Progress", value: stats.inProgress || 0 },
      { name: "Completed", value: stats.completed || 0 },
    ]);
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#1e293b]/90 p-4 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-xl bg-cyan-500/10 p-2.5">
            <PieChartIcon size={18} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Task Analytics
            </h2>

            <p className="text-xs text-slate-400">
              Live task distribution
            </p>
          </div>

        </div>

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
          ● LIVE
        </span>

      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={75}
              innerRadius={50}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #22d3ee30",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#cbd5e1",
                fontSize: 12,
              }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}