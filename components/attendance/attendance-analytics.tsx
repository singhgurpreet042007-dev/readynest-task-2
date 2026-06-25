"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Present", value: 92 },
  { name: "Absent", value: 8 },
];

const COLORS = ["#10b981", "#ef4444"];

export default function AttendanceAnalytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass rounded-[28px] p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          Attendance Summary
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-[28px] p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold">
          Subject Wise Attendance
        </h2>

        <div className="space-y-4">
          {[
            ["DBMS", "95%"],
            ["DSA", "91%"],
            ["OS", "89%"],
            ["CN", "93%"],
          ].map(([subject, percent]) => (
            <div
              key={subject}
              className="rounded-2xl bg-white/50 p-4 flex justify-between"
            >
              <span>{subject}</span>
              <span>{percent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}