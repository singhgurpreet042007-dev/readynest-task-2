"use client";

import { useEffect, useState } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";

type User = {
  fullName: string;
  email: string;
  role: string;
};

export default function ProfileHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg">

      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-2xl font-bold text-white shadow-xl">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>

        <h1 className="mt-3 text-2xl font-bold text-white">
          {user?.fullName}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {user?.email}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">

          <div className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
            <GraduationCap size={14} />
            {user?.role}
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
            <ShieldCheck size={14} />
            Verified
          </div>

        </div>

      </div>
    </div>
  );
}