"use client";

import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  CheckSquare,
  Bell,
  NotebookPen,
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
    { title: "Tasks", value: stats.tasks, icon: CheckSquare, color: "from-cyan-500 to-blue-600" },
    { title: "Attendance", value: `${stats.attendance}%`, icon: ClipboardCheck, color: "from-emerald-500 to-teal-500" },
    { title: "Notices", value: stats.notices, icon: Bell, color: "from-violet-500 to-fuchsia-500" },
    { title: "Notes", value: stats.notes, icon: NotebookPen, color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4 backdrop-blur-xl transition hover:border-cyan-400/30"
          >

            {/* Glow */}
            <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-cyan-500/10 blur-2xl" />

            <div className="flex items-center justify-between">

              {/* Left */}
              <div>
                <p className="text-[11px] text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              {/* Icon */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}
              >
                <Icon size={18} className="text-white" />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}