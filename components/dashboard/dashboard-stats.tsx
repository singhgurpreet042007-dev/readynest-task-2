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
    {
      title: "Tasks",
      value: stats.tasks,
      icon: CheckSquare,
      color: "from-emerald-500 to-green-400",
    },
    {
      title: "Attendance",
      value: stats.attendance,
      icon: ClipboardCheck,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Notices",
      value: stats.notices,
      icon: Bell,
      color: "from-violet-500 to-purple-400",
    },
    {
      title: "Notes",
      value: stats.notes,
      icon: NotebookPen,
      color: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="glass card-hover relative overflow-hidden rounded-[28px] p-5"
          >
            <div
              className={`absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${card.color} text-white`}
            >
              <Icon size={20} />
            </div>

            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}