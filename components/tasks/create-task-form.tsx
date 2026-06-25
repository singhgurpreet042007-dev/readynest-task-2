"use client";

import { useState } from "react";
import {
  ClipboardList,
  FileText,
  PlusCircle,
} from "lucide-react";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createTask() {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      alert("Task Created Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0f172a] to-[#0a0f1f] p-5 shadow-xl">

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-2xl bg-cyan-500/15 p-3">
          <ClipboardList
            size={22}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Create Task
          </h2>

          <p className="text-sm text-slate-400">
            Add your next task
          </p>
        </div>

      </div>

      <div className="space-y-4">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Task Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
          />
        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <FileText size={15} />
            Description
          </label>

          <textarea
            rows={2}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Task description..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
          />

        </div>

        <button
          onClick={createTask}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.01]"
        >
          <PlusCircle size={18} />
          Create Task
        </button>

      </div>

    </div>
  );
}