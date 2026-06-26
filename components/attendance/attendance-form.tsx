"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  BookOpen,
  Percent,
  PlusCircle,
} from "lucide-react";

export default function AttendanceForm() {
  const [form, setForm] = useState({
    subject: "",
    percentage: "",
  });

  const handle = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function addAttendance() {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ subject: "", percentage: "" });
      alert("Attendance Added Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-4 rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-4 shadow-lg">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/15 p-2.5">
          <ClipboardCheck size={18} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Add Attendance
          </h2>
          <p className="text-xs text-slate-400">
            Record attendance for a subject
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

        <input
          type="number"
          value={form.percentage}
          onChange={(e) => handle("percentage", e.target.value)}
          placeholder="Percentage"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        />

      </div>

      {/* Button */}
      <button
        onClick={addAttendance}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2 font-semibold text-white transition hover:scale-[1.01]"
      >
        <PlusCircle size={16} />
        Add Attendance
      </button>

    </div>
  );
}