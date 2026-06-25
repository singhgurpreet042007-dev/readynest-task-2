"use client";

import {
  GraduationCap,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-[#0F172A] p-6 shadow-lg">

      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center">

        {/* Avatar */}

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-[0_0_30px_rgba(59,130,246,.45)]">
          <UserCircle2
            size={48}
            className="text-white"
          />
        </div>

        {/* User */}

        <h1 className="mt-4 text-3xl font-bold text-white">
          Student
        </h1>

        <p className="mt-1 text-slate-400">
          Smart Campus User
        </p>

        {/* Badges */}

        <div className="mt-5 flex flex-wrap justify-center gap-3">

          <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <GraduationCap size={16} />
            Student Portal
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <ShieldCheck size={16} />
            Verified Account
          </div>

        </div>

      </div>

    </div>
  );
}