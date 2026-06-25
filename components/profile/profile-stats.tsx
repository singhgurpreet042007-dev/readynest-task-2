"use client";

import {
  CheckSquare,
  ClipboardCheck,
  NotebookPen,
  Bell,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Tasks",
    value: "12",
    icon: CheckSquare,
    color: "from-emerald-500 to-green-400",
  },
  {
    title: "Attendance",
    value: "92%",
    icon: ClipboardCheck,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Notes",
    value: "8",
    icon: NotebookPen,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Notices",
    value: "4",
    icon: Bell,
    color: "from-orange-500 to-amber-400",
  },
];

export default function ProfileStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
          >
            {/* Glow */}
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-r ${item.color} opacity-20 blur-2xl`}
            />

            {/* Icon */}
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white`}
            >
              <Icon size={22} />
            </div>

            {/* Title */}
            <p className="text-sm text-slate-400">
              {item.title}
            </p>

            {/* Value */}
            <h2 className="mt-2 text-3xl font-bold text-white">
              {item.value}
            </h2>

            {/* Footer */}
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
              <TrendingUp size={14} />
              Active
            </div>
          </div>
        );
      })}

    </div>
  );
}