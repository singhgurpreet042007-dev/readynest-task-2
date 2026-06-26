"use client";

import { useState, useEffect } from "react";
import { Bell, Sparkles } from "lucide-react";
import ReminderBell from "@/components/tasks/reminder-bell";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("STUDENT");

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (r) setRole(r);
  }, []);

  return (
    <div className="relative mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B0F1A]/90 via-[#111827]/90 to-[#0B0F1A]/90 px-5 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-transparent to-rose-500/5 blur-2xl" />

      {/* LEFT */}
      <div className="relative flex items-center gap-3 z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 shadow-lg shadow-amber-500/20">
          <Sparkles size={18} className="text-white" />
        </div>

        <div>
          <h1 className="text-sm font-semibold text-white">
            Smart Campus
          </h1>
          <p className="text-[11px] text-slate-400">
            {role === "ADMIN" ? "Admin Dashboard" : "Student Dashboard"}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center gap-3 z-10">

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:scale-105 transition"
          >
            <Bell size={16} className="text-slate-300" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {open && (
            <div className="fixed right-6 top-20 z-[9999] w-72 rounded-2xl border border-white/10 bg-[#0B0F1A]/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

              <div className="mb-2 text-xs font-semibold text-amber-300">
                Notifications
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  🔔 New task assigned
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  📢 New notice published
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  📊 Attendance updated
                </div>
              </div>
            </div>
          )}

        </div>

        <ReminderBell />

        {/* PROFILE */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">

          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />

          <div className="leading-tight">
            <p className="text-xs text-white">
              {role === "ADMIN" ? "Admin" : "Student"}
            </p>
            <p className="text-[10px] text-slate-400">
              {role === "ADMIN" ? "Full Access" : "Limited Access"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}