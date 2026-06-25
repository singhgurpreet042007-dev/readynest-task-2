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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="glass rounded-[28px] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white`}
              >
                <Icon size={20} />
              </div>

              <span className="text-xs text-slate-400">
                LIVE
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold">
              {item.value}
            </h2>

            <p className="mt-2 text-slate-500">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}