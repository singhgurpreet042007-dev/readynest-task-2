"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  CheckSquare,
  NotebookPen,
  Bell,
  User,
  LogOut,
} from "lucide-react";

const studentLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Attendance", href: "/attendance", icon: ClipboardCheck },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Notices", href: "/notices", icon: Bell },
  { label: "Timetable", href: "/timetable", icon: CalendarDays },
  { label: "Profile", href: "/profile", icon: User },
];

const adminLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Attendance", href: "/attendance", icon: ClipboardCheck },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Notices", href: "/notices", icon: Bell },
  { label: "Timetable", href: "/timetable", icon: CalendarDays },
  
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "STUDENT");
  }, []);

  const links = role === "ADMIN" ? adminLinks : studentLinks;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-[#070B1A] text-white">

      {/* HEADER */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-bold">Smart Campus</h1>
        <p className="mt-2 text-sm text-slate-400">
          {role === "ADMIN" ? "Admin Panel" : "Student Panel"}
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="px-4 space-y-3 mt-4">
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition cursor-pointer ${
                active
                  ? "bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,.55)]"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-red-400 hover:bg-red-500/20"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}