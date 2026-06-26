import {
  ClipboardCheck,
  CheckSquare,
  CalendarDays,
  Bell,
} from "lucide-react";

const stats = [
  {
    title: "Attendance",
    value: "92%",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Tasks",
    value: "08",
    icon: CheckSquare,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Classes",
    value: "05",
    icon: CalendarDays,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Notices",
    value: "03",
    icon: Bell,
    color: "from-orange-500 to-red-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4 backdrop-blur-xl transition hover:border-cyan-400/20"
          >

            {/* Top row */}
            <div className="flex items-center justify-between">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white`}
              >
                <Icon size={18} />
              </div>

              <span className="text-[10px] text-slate-500">
                LIVE
              </span>

            </div>

            {/* Value */}
            <h2 className="mt-3 text-2xl font-bold text-white">
              {item.value}
            </h2>

            {/* Title */}
            <p className="text-xs text-slate-400">
              {item.title}
            </p>

          </div>
        );
      })}

    </div>
  );
}