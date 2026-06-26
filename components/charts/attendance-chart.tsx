"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";

type AttendanceData = {
  subject: string;
  percentage: number;
};

export default function AttendanceChart() {
  const [data, setData] = useState<AttendanceData[]>([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch("/api/attendance-stats");
    const attendance = await res.json();
    setData(attendance);
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#1e293b]/90 p-4 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-xl bg-cyan-500/10 p-2.5">
            <BarChart3 size={18} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Attendance Analytics
            </h2>

            <p className="text-xs text-slate-400">
              Subject-wise attendance
            </p>
          </div>

        </div>

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
          ● LIVE
        </span>

      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid stroke="#ffffff10" vertical={false} />

            <XAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#0f172a" }}
              contentStyle={{
                background: "#111827",
                border: "1px solid #22d3ee30",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="percentage"
              fill="#22d3ee"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}