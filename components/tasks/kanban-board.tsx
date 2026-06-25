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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchTasks();
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  }

  const columns = [
    {
      title: "To Do",
      status: "TODO",
      icon: ClipboardList,
      color: "cyan",
    },
    {
      title: "In Progress",
      status: "IN_PROGRESS",
      icon: Loader2,
      color: "orange",
    },
    {
      title: "Completed",
      status: "COMPLETED",
      icon: Trophy,
      color: "emerald",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => {
        const Icon = column.icon;

        const filtered = tasks.filter(
          (task) => task.status === column.status
        );

        return (
          <div
            key={column.title}
            className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div
                  className={`rounded-xl p-2 ${
                    column.color === "cyan"
                      ? "bg-cyan-500/15 text-cyan-400"
                      : column.color === "orange"
                      ? "bg-orange-500/15 text-orange-400"
                      : "bg-emerald-500/15 text-emerald-400"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    {column.title}
                  </h2>

                  <p className="text-xs text-slate-400">
                    {filtered.length} Tasks
                  </p>
                </div>

              </div>

            </div>

            <div className="space-y-3">

              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-sm text-slate-500">
                  No Tasks
                </div>
              )}

              {filtered.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <h3 className="font-medium text-white">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-3 flex gap-2">

                    {task.status === "TODO" && (
                      <button
                        onClick={() =>
                          updateTask(task.id, "IN_PROGRESS")
                        }
                        className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <PlayCircle size={16} />
                      </button>
                    )}

                    {task.status === "IN_PROGRESS" && (
                      <button
                        onClick={() =>
                          updateTask(task.id, "COMPLETED")
                        }
                        className="rounded-lg bg-emerald-500 p-2 text-white hover:bg-emerald-600"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      <Trash2 size={16} />
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