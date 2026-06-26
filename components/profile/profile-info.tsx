"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  Hash,
  Building2,
} from "lucide-react";

type User = {
  fullName: string;
  email: string;
  phone: string | null;
  department: string | null;
  semester: string | null;
  rollNumber: string | null;
};

export default function ProfileInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setUser(data);
  }

  const cards = [
    { title: "Email", value: user?.email || "-", icon: Mail, color: "text-cyan-400" },
    { title: "Phone", value: user?.phone || "Not Added", icon: Phone, color: "text-green-400" },
    { title: "Department", value: user?.department || "Not Added", icon: GraduationCap, color: "text-violet-400" },
    { title: "Semester", value: user?.semester || "Not Added", icon: Building2, color: "text-orange-400" },
    { title: "Roll Number", value: user?.rollNumber || "Not Added", icon: Hash, color: "text-pink-400" },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-[#0F172A] p-3 shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-slate-800 p-2">
                <Icon size={18} className={item.color} />
              </div>

              <div className="min-w-0 leading-tight">
                <p className="text-[11px] text-slate-400">
                  {item.title}
                </p>

                <h3 className="mt-0.5 break-all text-xs font-semibold text-white">
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}