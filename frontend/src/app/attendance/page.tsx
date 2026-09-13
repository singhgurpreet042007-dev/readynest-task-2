"use client";

import React, { useEffect, useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ProgressRing } from '../../components/ui/ProgressRing';
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from '../../services/attendance';
import { AttendanceSummary, Attendance } from '../../types';
import { AuthGuard } from '../../components/guards/RoleGuard';

export default function AttendancePage() {
  const [data, setData] = useState<AttendanceSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Add form state
  const [subjectName, setSubjectName] = useState('');
  const [totalClasses, setTotalClasses] = useState('30');
  const [attendedClasses, setAttendedClasses] = useState('25');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const res = await getAttendance();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddSubject(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createAttendance({
        subject: subjectName,
        totalClasses: Number(totalClasses),
        attendedClasses: Number(attendedClasses),
      });
      setAddModalOpen(false);
      setSubjectName('');
      loadAttendance();
    } catch (err) {
      alert('Failed to add subject');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleMark(id: string, mark: 'present' | 'absent') {
    try {
      await updateAttendance(id, { mark });
      loadAttendance();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to remove this subject?')) {
      try {
        await deleteAttendance(id);
        loadAttendance();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const overallPct = data?.overallPercentage ?? 0;
  const lowCount = data?.records.filter((r) => r.percentage < 75).length ?? 0;

  const getClassesNeeded = (rec: Attendance) => {
    if (rec.percentage >= 75) return 0;
    const needed = Math.ceil(3 * rec.totalClasses - 4 * rec.attendedClasses);
    return needed > 0 ? needed : 1;
  };

  return (
    <AuthGuard>
    <DashboardLayout
      title="Attendance Management"
      subtitle="Track subject attendance, calculate regulatory limits & prevent debarment"
    >
      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-xs font-medium tracking-tight">
            <span>Mandate: ≥ 75.0%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Subject Attendance Matrix</h2>
          <p className="text-xs sm:text-[13px] text-neutral-500">
            Real-time percentage calculations and automated 75% target predictor
          </p>
        </div>

        <Button
          variant="orange"
          size="sm"
          onClick={() => setAddModalOpen(true)}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Subject
        </Button>
      </div>

      {/* Top Metrics Row: Tasteful Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-black/[0.08]">
        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Overall Attendance</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">{overallPct}%</p>
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border font-medium ${
              overallPct >= 75
                ? 'text-emerald-700 border-emerald-500/30 bg-emerald-50'
                : 'text-orange-600 border-orange-500/40 bg-orange-50'
            }`}>
              {overallPct >= 75 ? 'Safe Above Limit' : 'Debarment Risk'}
            </span>
          </div>
          <ProgressRing percentage={overallPct} size={58} strokeWidth={5} />
        </div>

        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all space-y-1">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Classes Attended</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">
            {data?.attendedClasses ?? 0} <span className="text-sm text-neutral-400 font-normal">/ {data?.totalClasses ?? 0}</span>
          </p>
          <p className="text-[11px] text-neutral-500">
            Across {data?.records.length ?? 0} registered courses
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all space-y-1">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-tight">Subjects Below 75%</p>
          <p className={`text-2xl sm:text-3xl font-bold ${lowCount > 0 ? 'text-orange-600' : 'text-[#1d1d1f]'}`}>
            {lowCount} {lowCount === 1 ? 'Course' : 'Courses'}
          </p>
          <p className="text-[11px] text-neutral-500">
            {lowCount > 0 ? 'Action required to avoid detention' : 'All courses in good standing'}
          </p>
        </div>
      </div>

      {/* Low Attendance Warning Alert */}
      {lowCount > 0 && (
        <div className="p-4 rounded-2xl border border-orange-500/30 bg-orange-50 text-orange-800 text-xs flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-orange-700 text-sm">
              Low Attendance Warning ({lowCount} {lowCount === 1 ? 'Course' : 'Courses'})
            </p>
            <p className="text-neutral-600 text-xs leading-relaxed">
              University guidelines mandate at least 75.0% attendance. Review the required lectures below to ensure exam eligibility.
            </p>
          </div>
        </div>
      )}

      {/* Subject Attendance List Wrapped in a Structured Card */}
      <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3">
        <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 text-[11px] uppercase font-semibold tracking-tight text-neutral-400 border-b border-black/[0.08]">
          <div className="col-span-5">Course / Subject</div>
          <div className="col-span-2">Ratio</div>
          <div className="col-span-2">Percentage</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-black/[0.06]">
          {!data?.records?.length ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              No courses tracked yet. Click &quot;Add Subject&quot; to begin tracking attendance.
            </div>
          ) : (
            data.records.map((rec) => {
            const isSafe = rec.percentage >= 75;
            const classesNeeded = getClassesNeeded(rec);

            return (
              <div key={rec.id} className="py-3.5 flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:items-center text-xs transition duration-150 hover:bg-neutral-50 px-2 rounded-xl">
                {/* Course Name & Required classes hint */}
                <div className="col-span-5 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1d1d1f] font-semibold text-sm">{rec.subject}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                      isSafe
                        ? 'text-emerald-700 border-emerald-500/30 bg-emerald-50'
                        : 'text-orange-600 border-orange-500/40 bg-orange-50'
                    }`}>
                      {rec.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {isSafe
                      ? 'Safe above 75% limit'
                      : `Attend next ${classesNeeded} consecutive ${classesNeeded === 1 ? 'lecture' : 'lectures'} to reach 75%`}
                  </p>
                </div>

                {/* Ratio */}
                <div className="col-span-2 font-mono text-xs text-neutral-700 font-semibold">
                  {rec.attendedClasses} / {rec.totalClasses}
                </div>

                {/* Percentage progress bar */}
                <div className="col-span-2 space-y-1">
                  <div className="w-full bg-black/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSafe ? 'bg-orange-500' : 'bg-neutral-400'
                      }`}
                      style={{ width: `${Math.min(100, rec.percentage)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons: Minimal Pill Buttons */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleMark(rec.id, 'present')}
                    className="px-3 py-1.5 rounded-full text-xs border border-black/[0.1] text-neutral-700 hover:text-[#1d1d1f] hover:border-orange-500/50 hover:bg-orange-50 flex items-center gap-1.5 transition cursor-pointer font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                    <span>+1 Present</span>
                  </button>
                  <button
                    onClick={() => handleMark(rec.id, 'absent')}
                    className="px-3 py-1.5 rounded-full text-xs border border-black/[0.1] text-neutral-500 hover:text-rose-600 hover:border-rose-500/40 hover:bg-rose-50 flex items-center gap-1.5 transition cursor-pointer font-medium"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>+1 Absent</span>
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                    title="Remove Subject"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          }))}
        </div>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Course to Tracker"
        description="Monitor attendance percentage and lecture records for a new course."
      >
        <form onSubmit={handleAddSubject} className="space-y-3.5">
          <Input
            label="Course / Subject Name"
            placeholder="e.g. Distributed Operating Systems"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Total Classes"
              type="number"
              min="0"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              required
            />
            <Input
              label="Attended Classes"
              type="number"
              min="0"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Course'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
    </AuthGuard>
  );
}
