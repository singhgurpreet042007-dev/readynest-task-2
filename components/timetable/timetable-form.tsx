"use client";

import { useState } from "react";
import {
  CalendarDays,
  BookOpen,
  Clock3,
  PlusCircle,
} from "lucide-react";

export default function TimetableForm() {
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function createTimetable() {
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        day,
        startTime,
        endTime,
      }),
    });

    if (res.ok) {
      alert("Timetable Added Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-5 shadow-lg">

      {/* Header */}

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/15 p-3">
          <CalendarDays
            size={22}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Add Schedule
          </h2>

          <p className="text-sm text-slate-400">
            Create a new class entry
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
            placeholder="e.g. DBMS"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
          />
        </div>

        {/* Day */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <CalendarDays size={15} />
            Day
          </label>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        {/* Start */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <Clock3 size={15} />
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        {/* End */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <Clock3 size={15} />
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

      </div>

      <button
        onClick={createTimetable}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.01]"
      >
        <PlusCircle size={18} />
        Add Timetable
      </button>

    </div>
  );
}