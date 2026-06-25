"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
];

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
      {
        name: "Todo",
        value: stats.todo || 0,
      },
      {
        name: "In Progress",
        value: stats.inProgress || 0,
      },
      {
        name: "Completed",
        value: stats.completed || 0,
      },
    ]);
  }

  return (
    <div className="glass rounded-[30px] p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Task Analytics
        </h2>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-600">
          Live
        </span>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((_, index) => (
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
  );
}