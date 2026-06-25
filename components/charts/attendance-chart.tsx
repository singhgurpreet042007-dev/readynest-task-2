"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AttendanceData = {
  subject: string;
  percentage: number;
};

export default function AttendanceChart() {
  const [data, setData] = useState<
    AttendanceData[]
  >([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch(
      "/api/attendance-stats"
    );

    const attendance =
      await res.json();

    setData(attendance);
  }

  return (
    <div className="glass rounded-[30px] p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Attendance Analytics
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          Live
        </span>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="subject" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Bar
              dataKey="percentage"
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}