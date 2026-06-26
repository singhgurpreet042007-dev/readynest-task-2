"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, ArrowRight, ListTodo } from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.slice(0, 4)));
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/15 bg-[#0f172a]/80 p-4 backdrop-blur-xl">

      {/* Header (compact) */}
      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-xl bg-cyan-500/10 p-2">
            <ListTodo className="text-cyan-400" size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Tasks
            </h2>
            <p className="text-[11px] text-slate-400">
              Latest work
            </p>
          </div>

        </div>

        <button className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-300">
          All
        </button>

      </div>

      {/* Empty */}
      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-xs text-slate-500">
          No tasks
        </div>
      ) : (
        <div className="space-y-2">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-400/20"
            >

              {/* Left */}
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {task.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Clock3 size={12} />
                    <span className="rounded-full bg-cyan-500/10 px-2 py-[2px] text-[10px] text-cyan-300">
                      {task.status}
                    </span>
                  </div>
                </div>

              </div>

              {/* Arrow */}
              <ArrowRight
                size={14}
                className="text-slate-500"
              />

            </div>
          ))}

        </div>
      )}

    </div>
  );
}