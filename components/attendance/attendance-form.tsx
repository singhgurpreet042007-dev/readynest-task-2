"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  BookOpen,
  Percent,
  PlusCircle,
} from "lucide-react";

export default function AttendanceForm() {
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] = useState("");

  async function addAttendance() {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        percentage,
      }),
    });

    if (res.ok) {
      setSubject("");
      setPercentage("");

      alert("Attendance Added Successfully");

      window.location.reload();
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-5 shadow-lg">

      {/* Header */}

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/15 p-3">
          <ClipboardCheck
            size={22}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Add Attendance
          </h2>

          <p className="text-sm text-slate-400">
            Record attendance for a subject
          </p>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {/* Subject */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <BookOpen size={15} />
            Subject
          </label>

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
          />

        </div>

        {/* Percentage */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <Percent size={15} />
            Attendance %
          </label>

          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="0 - 100"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
          />

        </div>

      </div>

      <button
        onClick={addAttendance}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.01]"
      >
        <PlusCircle size={18} />
        Add Attendance
      </button>

    </div>
  );
}