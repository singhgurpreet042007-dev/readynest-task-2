"use client";

import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  CheckSquare,
  Bell,
  NotebookPen,
  TrendingUp,
} from "lucide-react";

type Stats = {
  tasks: number;
  attendance: number;
  notices: number;
  notes: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    tasks: 0,
    attendance: 0,
    notices: 0,
    notes: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const cards = [
    {
      title: "Tasks",
      value: stats.tasks,
      icon: CheckSquare,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Attendance",
      value: `${stats.attendance}%`,
      icon: ClipboardCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Notices",
      value: stats.notices,
      icon: Bell,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Notes",
      value: stats.notes,
      icon: NotebookPen,
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.18)]"
          >
            {/* Glow */}
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-500/20" />

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                  <TrendingUp size={14} />
                  Live Data
                </div>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}
              >
                <Icon className="text-white" size={24} />
              </div>

            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                style={{ width: "75%" }}
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}