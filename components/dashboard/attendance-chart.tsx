"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", attendance: 90 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 95 },
  { day: "Thu", attendance: 88 },
  { day: "Fri", attendance: 94 },
  { day: "Sat", attendance: 97 },
];

export default function AttendanceChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4 backdrop-blur-xl">

      {/* Header */}
      <h2 className="mb-3 text-base font-semibold text-white">
        Attendance Overview
      </h2>

      {/* Chart */}
      <div className="h-56">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
              strokeWidth={2}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}