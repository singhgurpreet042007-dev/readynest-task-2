"use client";

import React, { useEffect, useState } from 'react';
import {
  Users,
  ClipboardCheck,
  CheckSquare,
  Bell,
  CalendarPlus,
  Send,
  TrendingUp,
  Search,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { RoleGuard } from '../../components/guards/RoleGuard';
import { useAuth } from '../../hooks/useAuth';
import { getAdminStats, getAdminStudents } from '../../services/admin';
import { createNotice } from '../../services/notices';
import { createTimetable } from '../../services/timetable';
import { AdminStats, StudentListItem } from '../../types';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);

  // Notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Academic');

  // Timetable form
  const [ttSubject, setTtSubject] = useState('');
  const [ttFaculty, setTtFaculty] = useState('');
  const [ttDay, setTtDay] = useState('Monday');
  const [ttStartTime, setTtStartTime] = useState('09:00 AM');
  const [ttEndTime, setTtEndTime] = useState('10:30 AM');
  const [ttRoom, setTtRoom] = useState('Room 302');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadData = async () => {
    try {
      const [statsData, studentsData] = await Promise.all([
        getAdminStats(),
        getAdminStudents(),
      ]);
      setStats(statsData);
      setStudents(studentsData);
    } catch (err) {
      console.error('Failed to load admin stats', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createNotice({
        title: noticeTitle,
        content: noticeContent,
        category: noticeCategory,
      });
      setSuccessMessage('Notice published successfully to campus portals');
      setNoticeModalOpen(false);
      setNoticeTitle('');
      setNoticeContent('');
      await loadData();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      alert('Failed to publish notice');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTimetable = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTimetable({
        course: 'B.Tech CSE',
        semester: 'Semester 6',
        subject: ttSubject,
        faculty: ttFaculty,
        day: ttDay,
        startTime: ttStartTime,
        endTime: ttEndTime,
        room: ttRoom,
      });
      setSuccessMessage('Class schedule added successfully');
      setTimetableModalOpen(false);
      setTtSubject('');
      setTtFaculty('');
      await loadData();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      alert('Failed to create timetable entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RoleGuard allowed="ADMIN">
    <DashboardLayout
      title="Administrator Console"
      subtitle="Institutional governance, student attendance analytics, notices and schedule control"
    >
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-500/30 text-emerald-700 text-xs font-medium flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-[11px] hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[10px] font-medium tracking-tight">
            <span>Executive Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Academic Oversight</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Authenticated as {user?.name || 'Campus Administrator'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="orange"
            size="sm"
            onClick={() => setNoticeModalOpen(true)}
            icon={<Send className="w-3.5 h-3.5" />}
          >
            Broadcast Notice
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTimetableModalOpen(true)}
            icon={<CalendarPlus className="w-3.5 h-3.5" />}
          >
            Schedule Class
          </Button>
        </div>
      </div>

      {/* 1. Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-orange-500/40 transition-all space-y-1">
          <p className="text-xs text-neutral-500 font-medium tracking-tight">Total Enrolled</p>
          <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{stats?.totalStudents ?? 0}</p>
          <p className="text-[11px] text-neutral-500 pt-1">
            Registered campus students
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-orange-500/40 transition-all space-y-1">
          <p className="text-xs text-neutral-500 font-medium tracking-tight">Avg Attendance</p>
          <p className="text-3xl font-bold tracking-tight text-orange-600">{stats?.averageAttendance ?? 0}%</p>
          <p className="text-[11px] text-neutral-500 pt-1">Live institutional average</p>
        </div>

        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-orange-500/40 transition-all space-y-1">
          <p className="text-xs text-neutral-500 font-medium tracking-tight">Active Tasks</p>
          <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{stats?.activeTasks ?? 0}</p>
          <p className="text-[11px] text-neutral-500 pt-1">Student assignments in progress</p>
        </div>

        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-orange-500/40 transition-all space-y-1">
          <p className="text-xs text-neutral-500 font-medium tracking-tight">Broadcasts</p>
          <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{stats?.totalNotices ?? 0}</p>
          <p className="text-[11px] text-neutral-500 pt-1">Active published circulars</p>
        </div>
      </div>

      {/* 2. Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Distribution */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
          <div>
            <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">Attendance Distribution</h3>
            <p className="text-xs text-neutral-500">Regulatory mandate thresholds across all enrolled students</p>
          </div>

          <div className="space-y-3 pt-1">
            {!stats || stats.attendanceDistribution.every((d) => d.count === 0) ? (
              <div className="py-8 text-center text-xs text-neutral-400">
                No student attendance recorded yet.
              </div>
            ) : (
              stats.attendanceDistribution.map((dist, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-700 font-medium">{dist.range}</span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      {dist.count} Students ({dist.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        dist.range.includes('Critical')
                          ? 'bg-rose-500'
                          : dist.range.includes('75-89')
                          ? 'bg-orange-500'
                          : dist.range.includes('90')
                          ? 'bg-emerald-600'
                          : 'bg-neutral-400'
                      }`}
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weekly Density */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
          <div>
            <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">Weekly Class Activity</h3>
            <p className="text-xs text-neutral-500">Scheduled classes and real attendance rates by weekday</p>
          </div>

          <div className="grid grid-cols-6 gap-2 pt-2">
            {(() => {
              const maxClasses = Math.max(...(stats?.weeklyActivity.map((d) => d.classes) || [1]), 1);
              return stats?.weeklyActivity.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-orange-600 font-medium">{day.attendanceRate}%</span>
                  <div className="w-full bg-black/[0.04] rounded-xl h-24 flex items-end p-1">
                    <div
                      className="w-full bg-orange-500 rounded-lg transition-all duration-500"
                      style={{ height: `${day.classes > 0 ? Math.round((day.classes / maxClasses) * 100) : 4}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-600 font-medium">{day.day.slice(0, 3)}</span>
                  <span className="text-[10px] text-neutral-400">{day.classes} class{day.classes !== 1 ? 'es' : ''}</span>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* 3. Student Directory */}
      <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">Student Directory</h3>
            <p className="text-xs text-neutral-500">Enrolled student standing and academic progress</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-black/[0.12] bg-white pl-8 pr-3 py-1.5 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none focus:border-orange-500/60 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/[0.08] text-[10px] font-medium uppercase text-neutral-400 tracking-tight">
              <tr>
                <th className="pb-2 px-2">Student Name</th>
                <th className="pb-2 px-2">Roll Number</th>
                <th className="pb-2 px-2">Program</th>
                <th className="pb-2 px-2">Attendance</th>
                <th className="pb-2 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-neutral-400">
                    {searchQuery ? 'No matching students found.' : 'No registered students in directory.'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-3 px-2">
                      <p className="text-sm font-medium text-[#1d1d1f]">{s.name}</p>
                      <p className="text-[10px] text-neutral-500">{s.email}</p>
                    </td>
                    <td className="py-3 px-2 font-mono text-[11px] text-orange-600 font-medium">
                      {s.enrollmentNumber}
                    </td>
                    <td className="py-3 px-2 text-neutral-600">
                      {s.course} • {s.semester}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`font-mono ${
                          s.overallAttendance >= 75 ? 'text-[#1d1d1f]' : 'text-orange-600 font-medium'
                        }`}
                      >
                        {s.overallAttendance}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                          s.overallAttendance >= 75
                            ? 'border-emerald-500/30 text-emerald-700 bg-emerald-50'
                            : 'border-orange-500/40 text-orange-600 bg-orange-50'
                        }`}
                      >
                        {s.status || (s.overallAttendance >= 75 ? 'Good Standing' : 'Warning (<75%)')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Notice Modal */}
      <Modal
        isOpen={noticeModalOpen}
        onClose={() => setNoticeModalOpen(false)}
        title="Broadcast Campus Notice"
        description="Publish an announcement directly to student dashboards."
      >
        <form onSubmit={handleCreateNotice} className="space-y-3.5">
          <Input
            label="Notice Title"
            placeholder="e.g. Mid-Semester Exam Schedule"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
              Category
            </label>
            <select
              value={noticeCategory}
              onChange={(e) => setNoticeCategory(e.target.value)}
              className="w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] outline-none focus:border-orange-500/60 cursor-pointer"
            >
              <option value="Academic">Academic</option>
              <option value="Exams">Exams</option>
              <option value="Events">Events</option>
              <option value="Urgent">Urgent</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
              Notice Content
            </label>
            <textarea
              rows={4}
              placeholder="Enter full notice announcement details..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              required
              className="w-full rounded-xl border border-black/[0.12] bg-white p-3 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none focus:border-orange-500/60"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setNoticeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Broadcasting...' : 'Broadcast'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Timetable Modal */}
      <Modal
        isOpen={timetableModalOpen}
        onClose={() => setTimetableModalOpen(false)}
        title="Schedule New Lecture"
        description="Add a class to the institutional academic schedule."
      >
        <form onSubmit={handleCreateTimetable} className="space-y-3.5">
          <Input
            label="Subject Name"
            placeholder="e.g. Cloud Computing & DevOps"
            value={ttSubject}
            onChange={(e) => setTtSubject(e.target.value)}
            required
          />

          <Input
            label="Faculty Name"
            placeholder="e.g. Dr. Vikram Malhotra"
            value={ttFaculty}
            onChange={(e) => setTtFaculty(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
                Day of Week
              </label>
              <select
                value={ttDay}
                onChange={(e) => setTtDay(e.target.value)}
                className="w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] outline-none focus:border-orange-500/60 cursor-pointer"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <Input
              label="Room / Hall"
              placeholder="e.g. Room 302"
              value={ttRoom}
              onChange={(e) => setTtRoom(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Time"
              placeholder="09:00 AM"
              value={ttStartTime}
              onChange={(e) => setTtStartTime(e.target.value)}
              required
            />
            <Input
              label="End Time"
              placeholder="10:30 AM"
              value={ttEndTime}
              onChange={(e) => setTtEndTime(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setTimetableModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
    </RoleGuard>
  );
}
