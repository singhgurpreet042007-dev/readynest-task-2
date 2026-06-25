"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ClipboardCheck,
  CheckSquare,
  CalendarDays,
  User,
} from "lucide-react";

const items = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/attendance",
    icon: ClipboardCheck,
  },
  {
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    href: "/timetable",
    icon: CalendarDays,
  },
  {
    href: "/profile",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="flex justify-around py-3">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Icon
                className={
                  active
                    ? "text-emerald-500"
                    : "text-slate-400"
                }
                size={24}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}