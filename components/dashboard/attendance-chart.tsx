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
    <div className="glass rounded-[28px] p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-6">
        Attendance Overview
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}