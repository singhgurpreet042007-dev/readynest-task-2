"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

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
    <div className="glass rounded-[28px] p-5">
      <h2 className="mb-4 text-xl font-bold">
        Recent Tasks
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-2xl border border-white/10 p-3"
          >
            <CheckCircle2
              size={18}
              className="text-emerald-500"
            />

            <div>
              <h3 className="font-medium">
                {task.title}
              </h3>

              <p className="text-sm text-slate-500">
                {task.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}