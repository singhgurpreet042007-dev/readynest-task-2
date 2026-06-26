"use client";

import { useState } from "react";
import { ClipboardList, PlusCircle } from "lucide-react";

export default function CreateTaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function createTask() {
    if (!form.title.trim()) return alert("Task title is required");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setForm({ title: "", description: "", dueDate: "", dueTime: "" });
      alert("Task Created Successfully");
      window.location.reload();
    } else {
      alert(data.message || "Failed to create task");
    }
  }

  return (
    <div className="mb-3 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0f172a] to-[#0a0f1f] p-3 shadow-lg">

      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-cyan-500/15 p-2">
          <ClipboardList size={16} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-base font-bold text-white">Create Task</h2>
          <p className="text-[11px] text-slate-400">
            Add task reminder
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-2">

        <input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Task title"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
        />

        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description"
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
        />

        <div className="grid grid-cols-2 gap-2">

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
          />

          <input
            type="time"
            value={form.dueTime}
            onChange={(e) => handleChange("dueTime", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
          />

        </div>

        <button
          onClick={createTask}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-1.5 text-sm font-semibold text-white"
        >
          <PlusCircle size={14} />
          Create
        </button>

      </div>
    </div>
  );
}