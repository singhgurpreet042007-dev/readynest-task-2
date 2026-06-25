"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ArrowRight,
  ListTodo,
} from "lucide-react";

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
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#1e293b]/90 p-6 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-cyan-500/10 p-3">
            <ListTodo className="text-cyan-400" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Recent Tasks
            </h2>

            <p className="text-sm text-slate-400">
              Latest assigned work
            </p>
          </div>

        </div>

        <button className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-300 transition hover:bg-cyan-500/20">
          View All
        </button>

      </div>

      {/* Empty State */}

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-slate-400">
          No recent tasks found.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-500/5"
            >
              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-emerald-500/15 p-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {task.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <Clock3
                      size={14}
                      className="text-slate-500"
                    />

                    <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-300">
                      {task.status}
                    </span>

                  </div>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-400"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}