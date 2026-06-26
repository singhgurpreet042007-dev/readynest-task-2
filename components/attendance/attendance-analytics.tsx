"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import {
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";

const data = [
  { name: "Present", value: 92 },
  { name: "Absent", value: 8 },
];

const COLORS = ["#06b6d4", "#ef4444"];

export default function AttendanceAnalytics() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">

      {/* Summary */}
      <div className="rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-4 shadow-lg">

        <div className="mb-3 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/15 p-2">
              <PieChartIcon size={18} className="text-cyan-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Attendance Summary
              </h2>
              <p className="text-xs text-slate-400">
                Overall Performance
              </p>
            </div>

          </div>

          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
            92%
          </span>

        </div>

        <div className="h-48">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "none",
                  borderRadius: "10px",
                }}
              />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Subject Wise */}
      <div className="rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-4 shadow-lg">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/15 p-2">
            <TrendingUp size={18} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Subject Wise
            </h2>
            <p className="text-xs text-slate-400">
              Latest Attendance
            </p>
          </div>

        </div>

        <div className="space-y-2.5">

          {[
            ["DBMS", 95],
            ["DSA", 91],
            ["OS", 89],
            ["CN", 93],
          ].map(([subject, percent]) => (
            <div
              key={subject}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5"
            >

              <div className="mb-1.5 flex justify-between text-xs">
                <span className="font-medium text-white">
                  {subject}
                </span>
                <span className="text-cyan-400">{percent}%</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
                <div
                  style={{ width: `${percent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}