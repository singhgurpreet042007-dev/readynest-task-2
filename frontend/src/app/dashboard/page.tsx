"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  CalendarDays,
  CheckSquare,
  Bell,
  Clock,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { Button } from '../../components/ui/Button';
import { RoleGuard } from '../../components/guards/RoleGuard';
import { useAuth } from '../../hooks/useAuth';
import { getAttendance } from '../../services/attendance';
import { getTasks } from '../../services/tasks';
import { getTimetable } from '../../services/timetable';
import { getNotices } from '../../services/notices';
import { AttendanceSummary, Task, TimetableEntry, Notice } from '../../types';

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const [attendance, setAttendance] = useState<AttendanceSummary | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [attData, taskData, ttData, notData] = await Promise.all([
          getAttendance(),
          getTasks(),
          getTimetable('Monday'),
          getNotices(),
        ]);

        setAttendance(attData);
        setTasks(taskData.tasks);
        setTimetable(ttData.timetable);
        setNotices(notData.notices);
      } catch (err) {
        console.error('Failed loading student dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const overallPct = attendance?.overallPercentage ?? 0;
  const pendingTasks = tasks.filter((t) => t.status !== 'COMPLETED');

  return (
    <RoleGuard allowed="STUDENT">
    <DashboardLayout
      title="Student Workspace"
      subtitle="Real-time academic telemetry, lectures, tasks and official notices"
    >
      {/* 1. Clean Open Greeting */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-orange-500/30 bg-orange-50 text-orange-600 text-xs font-medium tracking-tight">
            <span>Spring Term 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
            Welcome back, {user?.name || 'Student'}
          </h2>
          <p className="text-xs sm:text-[13px] text-neutral-600">
            You have <span className="text-[#1d1d1f] font-semibold">{timetable.length} lectures scheduled today</span> and{' '}
            <span className="text-orange-600 font-semibold">{pendingTasks.length} pending assignments</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/tasks">
            <Button variant="orange" size="sm" icon={<PlusCircle className="w-3.5 h-3.5" />}>
              New Task
            </Button>
          </Link>
          <Link href="/attendance">
            <Button variant="secondary" size="sm">
              Log Attendance
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Metrics Row: Tasteful Cards with Subtle Hairline Borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-black/[0.08]">
        {/* Metric 1: Overall Attendance */}
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Overall Attendance</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">{overallPct}%</p>
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border font-medium ${
              overallPct >= 75
                ? 'text-emerald-700 border-emerald-300 bg-emerald-50'
                : 'text-orange-700 border-orange-300 bg-orange-50'
            }`}>
              {overallPct >= 75 ? 'Safe > 75%' : 'Warning'}
            </span>
          </div>
          <div className="hidden sm:block">
            <ProgressRing percentage={overallPct} size={58} strokeWidth={5} />
          </div>
        </div>

        {/* Metric 2: Classes Today */}
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all space-y-1">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Today&apos;s Classes</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">{timetable.length} Classes</p>
          <p className="text-[11px] text-neutral-500 truncate">
            {timetable.length > 0 ? `Next: ${timetable[0].subject} (${timetable[0].startTime})` : 'No lectures scheduled'}
          </p>
        </div>

        {/* Metric 3: Pending Tasks */}
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all space-y-1">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Pending Tasks</p>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600">{pendingTasks.length} Due</p>
          <p className="text-[11px] text-neutral-500">
            {pendingTasks.length > 0 ? `${pendingTasks.length} assignment${pendingTasks.length > 1 ? 's' : ''} active` : 'All tasks completed'}
          </p>
        </div>

        {/* Metric 4: Campus Circulars */}
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all space-y-1">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Campus Notices</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">{notices.length} Published</p>
          <p className="text-[11px] text-neutral-500 truncate">
            {notices.length > 0 ? notices[0].title : 'No circulars posted'}
          </p>
        </div>
      </div>

      {/* 3. Main Dashboard Sections in Clean Structured Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Left Column (7 cols): Today's Schedule & Subject Attendance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Schedule Card */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-semibold uppercase tracking-tight text-[#1d1d1f]">Today&apos;s Lectures</h3>
              </div>
              <Link href="/timetable" className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium transition">
                Full Week <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-black/[0.06]">
              {timetable.length === 0 ? (
                <div className="py-6 text-center text-xs text-neutral-400">
                  No lectures scheduled for today.
                </div>
              ) : (
                timetable.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between text-xs transition duration-150 hover:bg-neutral-50 px-2 rounded-xl"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1d1d1f] font-semibold">{item.subject}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-black/10 text-neutral-600 bg-neutral-100 font-medium">
                          {item.room}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">{item.faculty}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Subject Attendance Breakdown Card */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-semibold uppercase tracking-tight text-[#1d1d1f]">Subject Attendance Status</h3>
              </div>
              <Link href="/attendance" className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium transition">
                Attendance Matrix <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-black/[0.06]">
              {!attendance?.records?.length ? (
                <div className="py-6 text-center text-xs text-neutral-400">
                  No attendance records logged yet.
                </div>
              ) : (
                attendance.records.map((rec) => (
                  <div key={rec.id} className="py-3 space-y-2 px-2 rounded-xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1d1d1f] font-semibold">{rec.subject}</span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          rec.percentage >= 75 ? 'text-[#1d1d1f]' : 'text-orange-600'
                        }`}
                      >
                        {rec.attendedClasses}/{rec.totalClasses} ({rec.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-black/[0.07] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          rec.percentage >= 75 ? 'bg-orange-500' : 'bg-neutral-400'
                        }`}
                        style={{ width: `${Math.min(100, rec.percentage)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Tasks & Notices */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tasks Overview Card */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-semibold uppercase tracking-tight text-[#1d1d1f]">Pending Assignments</h3>
              </div>
              <Link href="/tasks" className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium transition">
                Tasks Board <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-black/[0.06]">
              {pendingTasks.length === 0 ? (
                <div className="py-6 text-center text-xs text-neutral-400">
                  No pending assignments. You&apos;re all caught up!
                </div>
              ) : (
                pendingTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="py-3 space-y-1 text-xs px-2 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[#1d1d1f] font-semibold truncate max-w-[200px]">{task.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-orange-300 text-orange-700 bg-orange-50 font-semibold">
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">{task.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Campus Circulars Card */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-semibold uppercase tracking-tight text-[#1d1d1f]">Latest Circulars</h3>
              </div>
              <Link href="/notices" className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium transition">
                All Notices <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-black/[0.06]">
              {notices.length === 0 ? (
                <div className="py-6 text-center text-xs text-neutral-400">
                  No official notices published yet.
                </div>
              ) : (
                notices.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="py-3 space-y-1 text-xs px-2 rounded-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-[#1d1d1f] font-semibold line-clamp-1">{notice.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-black/10 text-neutral-600 bg-neutral-100 font-medium">
                        {notice.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">{notice.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </RoleGuard>
  );
}
