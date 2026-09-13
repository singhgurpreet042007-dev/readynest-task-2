"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  CheckSquare,
  Bell,
  ShieldAlert,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { ProgressRing } from '../ui/ProgressRing';
import Link from 'next/link';

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<'student' | 'attendance' | 'timetable' | 'tasks' | 'notices' | 'admin'>('student');

  const tabs = [
    { id: 'student', label: 'Student Workspace', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance Ratio', icon: ClipboardCheck },
    { id: 'timetable', label: 'Schedule', icon: CalendarDays },
    { id: 'tasks', label: 'Assignments', icon: CheckSquare },
    { id: 'notices', label: 'Campus Notices', icon: Bell },
    { id: 'admin', label: 'Admin Console', icon: ShieldAlert },
  ];

  return (
    <section id="showcase" className="py-28 border-t border-white/[0.08] relative bg-[#08080a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Open and spacious */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
            Interactive Modules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            Designed for Academic Discipline
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal pt-1">
            Switch between modules to preview the lightweight, purpose-built utilities engineered for daily campus workflows.
          </p>
        </div>

        {/* Minimal Tab Selector (Apple pill style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition duration-150 cursor-pointer ${
                  isActive
                    ? 'border border-orange-500/60 bg-orange-500/10 text-orange-400 shadow-sm font-semibold'
                    : 'border border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sleek Minimal Preview Frame */}
        <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-6 sm:p-10 backdrop-blur-xl transition hover:border-orange-500/30">
          {/* Student Dashboard Preview */}
          {activeTab === 'student' && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Student Academic Overview</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Personalized real-time status for Aarav Sharma (21BCSE104)</p>
                </div>
                <Link href="/dashboard" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  Open Workspace <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Minimal metrics row (open, borderless) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-2 border-b border-white/[0.06]">
                <div className="flex items-center justify-between sm:border-r border-white/[0.06] sm:pr-8">
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-tight font-medium">Overall Attendance</p>
                    <p className="text-3xl font-light text-white mt-1">87.4%</p>
                    <span className="inline-block mt-1 text-[10px] font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Safe &gt; 75%
                    </span>
                  </div>
                  <ProgressRing percentage={87} size={64} strokeWidth={5} />
                </div>

                <div className="space-y-1 sm:border-r border-white/[0.06] sm:pr-8">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-tight font-medium">Today&apos;s Lectures</p>
                  <p className="text-3xl font-light text-white mt-1">4 Classes</p>
                  <p className="text-xs text-neutral-400">Next: Cloud Computing (11:00 AM)</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-tight font-medium">Deliverables</p>
                  <p className="text-3xl font-light text-orange-400 mt-1">3 Tasks</p>
                  <p className="text-xs text-neutral-400">Nearest: Terraform Lab (2 days)</p>
                </div>
              </div>

              {/* Minimal clean list items */}
              <div className="grid sm:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Today&apos;s Schedule</p>
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between py-2.5 text-xs">
                      <span className="text-white font-normal">Data Structures & Algorithms</span>
                      <span className="text-neutral-400 font-mono text-[11px]">09:00 AM • Room 101</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 text-xs">
                      <span className="text-white font-normal">Cloud Computing & DevOps</span>
                      <span className="text-neutral-400 font-mono text-[11px]">11:00 AM • Lab 3</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Campus Circulars</p>
                  <div className="divide-y divide-white/[0.06]">
                    <div className="py-2.5 space-y-1">
                      <p className="text-xs font-normal text-white">Mid-Term Exam Datesheet Released</p>
                      <p className="text-[11px] text-neutral-400">Exams start next Monday. Download admit cards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Module Preview */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Attendance Matrix</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Dynamic 75% threshold calculator & subject breakdown</p>
                </div>
                <Link href="/attendance" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  Open Tracker <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {[
                  { name: 'Data Structures', attended: 38, total: 42, pct: 90.5, status: 'safe' },
                  { name: 'Cloud Computing', attended: 28, total: 34, pct: 82.4, status: 'safe' },
                  { name: 'Computer Networks', attended: 18, total: 26, pct: 69.2, status: 'warning' },
                ].map((sub, i) => (
                  <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{sub.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          sub.status === 'safe'
                            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-medium'
                            : 'text-orange-400 border-orange-500/30 bg-orange-500/10 font-medium'
                        }`}>
                          {sub.pct}%
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        {sub.attended} of {sub.total} classes attended • {sub.status === 'safe' ? 'Above 75% limit' : 'Requires 3 consecutive attendances'}
                      </p>
                    </div>

                    <div className="w-36 bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sub.status === 'safe' ? 'bg-orange-500' : 'bg-neutral-500'}`}
                        style={{ width: `${sub.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timetable Preview */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Lecture Grid</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Room allocations, timings and faculty assignments</p>
                </div>
                <Link href="/timetable" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  Full Schedule <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {[
                  { subject: 'Data Structures & Algorithms', time: '09:00 AM - 10:30 AM', faculty: 'Prof. Ananya Sen', room: 'Hall 101' },
                  { subject: 'Cloud Computing & DevOps', time: '11:00 AM - 12:30 PM', faculty: 'Dr. Vikram Malhotra', room: 'Lab 3' },
                  { subject: 'Artificial Intelligence', time: '01:30 PM - 03:00 PM', faculty: 'Dr. Meera Iyer', room: 'Turing Hall' },
                  { subject: 'Database Systems Lab', time: '03:15 PM - 04:45 PM', faculty: 'Prof. R. K. Gupta', room: 'Lab B-204' },
                ].map((tt, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="text-white font-medium text-sm">{tt.subject}</p>
                      <p className="text-xs text-neutral-400">{tt.faculty} • {tt.room}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span>{tt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Preview */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Assignment Tracker</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Deadlines, deliverables and academic priorities</p>
                </div>
                <Link href="/tasks" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  Open Board <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {[
                  { title: 'Submit Cloud Terraform Lab', status: 'IN PROGRESS', priority: 'HIGH', due: 'In 2 days' },
                  { title: 'Train CNN Leaf Disease Model', status: 'TODO', priority: 'HIGH', due: 'In 5 days' },
                  { title: 'DBMS Composite B-Tree Optimization', status: 'COMPLETED', priority: 'MEDIUM', due: 'Submitted' },
                ].map((task, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="text-white font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-neutral-400">Due {task.due}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-orange-500/40 text-orange-400 bg-orange-500/10 font-medium">
                        {task.priority}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices Preview */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Campus Circulars</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Official broadcasts from university departments</p>
                </div>
                <Link href="/notices" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  All Notices <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {[
                  { title: 'Mid-Semester Exam Datesheet Spring 2026', cat: 'Exams', author: 'Controller of Examinations', date: 'Today' },
                  { title: 'HackCampus 2026: 36-Hour Hackathon Registrations', cat: 'Events', author: 'Center for Innovation', date: 'Yesterday' },
                  { title: 'Central Library 24/7 Access During Examination Month', cat: 'Academic', author: 'Chief Librarian', date: '2 days ago' },
                ].map((not, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="text-white font-medium text-sm">{not.title}</p>
                      <p className="text-xs text-neutral-400">{not.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-neutral-300 bg-white/5">
                        {not.cat}
                      </span>
                      <span className="text-xs text-neutral-400">{not.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Panel Preview */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">Governance Console</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Institutional analytics and student directory</p>
                </div>
                <Link href="/admin" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition">
                  Admin Console <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-4">
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400 uppercase tracking-tight font-medium">Total Enrolled</p>
                  <p className="text-3xl font-light text-white">1,420</p>
                  <p className="text-[11px] text-emerald-400 font-medium">+12% this term</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400 uppercase tracking-tight font-medium">Avg Attendance</p>
                  <p className="text-3xl font-light text-orange-400">84.6%</p>
                  <p className="text-[11px] text-neutral-400">Across 8 depts</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400 uppercase tracking-tight font-medium">Active Sprints</p>
                  <p className="text-3xl font-light text-white">382</p>
                  <p className="text-[11px] text-neutral-400">Submissions</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-400 uppercase tracking-tight font-medium">Broadcasts</p>
                  <p className="text-3xl font-light text-white">24</p>
                  <p className="text-[11px] text-neutral-400">Active notices</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
