"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  PlayCircle,
  Trash2,
  ClipboardList,
  Loader2,
  Trophy,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  dueDate?: string;
  reminderAt?: string;
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function updateTask(
    id: string,
    status: "TODO" | "IN_PROGRESS" | "COMPLETED"
  ) {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchTasks();
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  const columns = [
    { title: "To Do", status: "TODO", icon: ClipboardList, color: "cyan" },
    { title: "Progress", status: "IN_PROGRESS", icon: Loader2, color: "orange" },
    { title: "Done", status: "COMPLETED", icon: Trophy, color: "emerald" },
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-3">

      {columns.map((column) => {
        const Icon = column.icon;

        const filtered = tasks.filter(
          (t) => t.status === column.status
        );

        return (
          <div
            key={column.title}
            className="rounded-xl border border-white/10 bg-[#0F172A] p-3 shadow-md"
          >

            {/* Header */}
            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div
                  className={`rounded-lg p-2 ${
                    column.color === "cyan"
                      ? "bg-cyan-500/15 text-cyan-400"
                      : column.color === "orange"
                      ? "bg-orange-500/15 text-orange-400"
                      : "bg-emerald-500/15 text-emerald-400"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {column.title}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {filtered.length} tasks
                  </p>
                </div>

              </div>

            </div>

            {/* Tasks */}
            <div className="space-y-2">

              {filtered.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 py-4 text-center text-xs text-slate-500">
                  No tasks
                </div>
              )}

              {filtered.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-3"
                >

                  <h3 className="text-sm font-medium text-white">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">
                      {task.description}
                    </p>
                  )}

                  {task.dueDate && (
                    <p className="mt-1 text-[10px] text-cyan-400">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  {task.reminderAt && (
                    <p className="text-[10px] text-yellow-400">
                      ⏰ {new Date(task.reminderAt).toLocaleString()}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-2 flex gap-1">

                    {task.status === "TODO" && (
                      <button
                        onClick={() =>
                          updateTask(task.id, "IN_PROGRESS")
                        }
                        className="rounded-md bg-blue-500 p-1.5 text-white"
                      >
                        <PlayCircle size={14} />
                      </button>
                    )}

                    {task.status === "IN_PROGRESS" && (
                      <button
                        onClick={() =>
                          updateTask(task.id, "COMPLETED")
                        }
                        className="rounded-md bg-emerald-500 p-1.5 text-white"
                      >
                        <CheckCircle size={14} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="rounded-md bg-red-500 p-1.5 text-white"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        );
      })}

    </div>
  );
}