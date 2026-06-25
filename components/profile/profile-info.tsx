"use client";

import {
  Mail,
  GraduationCap,
  Building2,
  IdCard,
} from "lucide-react";

const info = [
  {
    title: "Email",
    value: "Not Available",
    icon: Mail,
    color: "text-cyan-400",
  },
  {
    title: "Student ID",
    value: "Not Assigned",
    icon: IdCard,
    color: "text-emerald-400",
  },
  {
    title: "Department",
    value: "Not Added",
    icon: GraduationCap,
    color: "text-violet-400",
  },
  {
    title: "Institute",
    value: "Smart Campus",
    icon: Building2,
    color: "text-orange-400",
  },
];

export default function ProfileInfo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {info.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg transition hover:border-cyan-400/30"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <Icon
                  size={20}
                  className={item.color}
                />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h3 className="mt-1 font-semibold text-white">
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