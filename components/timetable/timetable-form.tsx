"use client";

import { useState } from "react";
import {
  CalendarDays,
  BookOpen,
  Clock3,
  PlusCircle,
} from "lucide-react";

export default function TimetableForm() {
  const [form, setForm] = useState({
    subject: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const handle = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function createTimetable() {
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Timetable Added Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-4 rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-4 shadow-lg">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/15 p-2.5">
          <CalendarDays size={18} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Add Schedule
          </h2>
          <p className="text-xs text-slate-400">
            Create a new class entry
          </p>
        </div>

      </div>

      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-2">

        <input
          value={form.subject}
          onChange={(e) => handle("subject", e.target.value)}
          placeholder="Subject"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        />

        <select
          value={form.day}
          onChange={(e) => handle("day", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        >
          <option value="">Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

        <input
          type="time"
          value={form.startTime}
          onChange={(e) => handle("startTime", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        />

        <input
          type="time"
          value={form.endTime}
          onChange={(e) => handle("endTime", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        />

      </div>

      {/* Button */}
      <button
        onClick={createTimetable}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2 font-semibold text-white transition hover:scale-[1.01]"
      >
        <PlusCircle size={16} />
        Add Timetable
      </button>

    </div>
  );
}