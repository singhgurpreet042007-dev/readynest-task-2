"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  CheckSquare,
  Bell,
  User,
  ShieldAlert,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const pathname = usePathname();
  const { user, role, logoutUser } = useAuth();

  const isAdmin = role === 'ADMIN';

  const navLinks = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: 'Main',
      hidden: isAdmin,
    },
    {
      label: 'Admin Console',
      href: '/admin',
      icon: ShieldAlert,
      badge: 'Admin',
      hidden: !isAdmin,
    },
    {
      label: 'Attendance',
      href: '/attendance',
      icon: ClipboardCheck,
    },
    {
      label: 'Timetable',
      href: '/timetable',
      icon: CalendarDays,
    },
    {
      label: 'Academic Tasks',
      href: '/tasks',
      icon: CheckSquare,
    },
    {
      label: 'Campus Notices',
      href: '/notices',
      icon: Bell,
    },
    {
      label: 'Profile & Identity',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    <aside className="w-60 border-r border-black/[0.08] bg-white flex flex-col shrink-0 h-screen sticky top-0 text-[#1d1d1f]">
      {/* Brand Header */}
      <div className="p-5 border-b border-black/[0.08]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg border border-orange-500/40 bg-orange-50 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight block">
              SmartCampus
            </span>
            <span className="text-[10px] text-neutral-500 tracking-tight">
              {isAdmin ? 'ADMINISTRATOR' : 'STUDENT PORTAL'}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Navigation
        </p>

        {navLinks
          .filter((item) => !item.hidden)
          .map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-full text-xs transition duration-150 ${
                  isActive
                    ? 'border border-orange-500/50 bg-orange-50 text-orange-600 font-semibold'
                    : 'border border-transparent text-neutral-600 hover:text-black hover:bg-black/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-orange-600' : 'text-neutral-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full border border-black/10 text-neutral-500 bg-neutral-100">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}



      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-black/[0.08] bg-white space-y-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full border border-orange-500/30 bg-orange-50 flex items-center justify-center font-semibold text-xs text-orange-600 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#1d1d1f] truncate">
              {user?.name || (isAdmin ? 'Dr. Rajesh Verma' : 'Aarav Sharma')}
            </p>
            <p className="text-[10px] text-neutral-500 truncate">
              {user?.email || (isAdmin ? 'admin@campus.edu' : 'student@campus.edu')}
            </p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-neutral-600 hover:text-rose-600 border border-black/[0.08] hover:border-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
