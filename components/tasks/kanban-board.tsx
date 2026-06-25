"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  PlayCircle,
  Trash2,
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
      body: JSON.stringify({
        status,
      }),
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
    },
    {
      title: "In Progress",
      status: "IN_PROGRESS",
    },
    {
      title: "Completed",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {columns.map((column) => (
        <div
          key={column.title}
          className="glass rounded-[28px] p-5 shadow-xl"
        >
          <h2 className="mb-5 text-xl font-bold">
            {column.title}
          </h2>

          <div className="space-y-4">
            {tasks
              .filter(
                (task) =>
                  task.status === column.status
              )
              .map((task) => (
                <div
                  key={task.id}
                  className="
                    rounded-2xl
                    border
                    bg-white/60
                    p-4
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    {task.status === "TODO" && (
                      <button
                        onClick={() =>
                          updateTask(
                            task.id,
                            "IN_PROGRESS"
                          )
                        }
                        className="
                          rounded-lg
                          bg-blue-500
                          p-2
                          text-white
                        "
                      >
                        <PlayCircle size={18} />
                      </button>
                    )}

                    {task.status ===
                      "IN_PROGRESS" && (
                      <button
                        onClick={() =>
                          updateTask(
                            task.id,
                            "COMPLETED"
                          )
                        }
                        className="
                          rounded-lg
                          bg-green-500
                          p-2
                          text-white
                        "
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      className="
                        rounded-lg
                        bg-red-500
                        p-2
                        text-white
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}