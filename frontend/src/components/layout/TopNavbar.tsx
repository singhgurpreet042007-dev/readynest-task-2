"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Calendar, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface TopNavbarProps {
  onMobileMenuToggle?: () => void;
  title?: string;
  subtitle?: string;
}

export function TopNavbar({ onMobileMenuToggle, title, subtitle }: TopNavbarProps) {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <header className="h-14 border-b border-black/[0.08] bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 text-[#1d1d1f]">
      {/* Left Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-1.5 rounded-full text-neutral-600 hover:text-black hover:bg-black/5 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div>
          {title && <h1 className="text-sm font-semibold text-[#1d1d1f] tracking-tight">{title}</h1>}
          {subtitle && <p className="text-[11px] text-neutral-500 tracking-tight">{subtitle}</p>}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Live status badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-orange-500/30 bg-orange-50 text-orange-600 text-[10px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>System Active</span>
        </div>

        {/* Date chip */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/[0.08] text-neutral-600 text-[10px]">
          <Calendar className="w-3 h-3 text-neutral-500" />
          <span>{currentDate || 'Spring Term 2026'}</span>
        </div>

        {/* Notification Bell */}
        <Link
          href="/notices"
          className="relative p-1.5 rounded-full border border-black/[0.08] text-neutral-600 hover:text-black hover:border-orange-500/40 transition-colors cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </Link>

        {/* Profile Avatar */}
        <Link
          href="/profile"
          className="flex items-center gap-2 pl-2 border-l border-black/[0.08] cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full border border-orange-500/30 bg-orange-50 flex items-center justify-center font-semibold text-[10px] text-orange-600">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="hidden lg:block text-xs font-medium text-neutral-700 hover:text-black">
            {user?.name ? user.name.split(' ')[0] : 'Profile'}
          </span>
        </Link>
      </div>
    </header>
  );
}
