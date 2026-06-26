"use client";

import {
  Clock3,
  BookOpen,
  CalendarDays,
} from "lucide-react";

const schedule = [
  {
    time: "09:00 AM",
    subject: "DBMS",
  },
  {
    time: "10:00 AM",
    subject: "Operating System",
  },
  {
    time: "11:00 AM",
    subject: "DSA",
  },
  {
    time: "02:00 PM",
    subject: "Computer Networks",
  },
];

export default function TimetableGrid() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-5 shadow-lg">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/15 p-3">
            <CalendarDays
              size={18}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Today's Schedule
            </h2>

            <p className="text-sm text-slate-400">
              Classes for today
            </p>

          </div>

        </div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {schedule.length} Classes
        </span>

      </div>

      <div className="space-y-3">

        {schedule.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-cyan-500/15 p-2">
                <BookOpen
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {item.subject}
                </h3>

                <p className="text-xs text-slate-400">
                  Scheduled Class
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-cyan-300">

              <Clock3 size={15} />

              <span className="text-sm font-medium">
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}