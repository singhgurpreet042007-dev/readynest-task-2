"use client";

import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Plus,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { AuthGuard } from '../../components/guards/RoleGuard';
import {
  getTimetable,
  createTimetable,
  deleteTimetable,
} from '../../services/timetable';
import { TimetableEntry } from '../../types';

export default function TimetablePage() {
  const { role } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form state
  const [subject, setSubject] = useState('');
  const [faculty, setFaculty] = useState('');
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [room, setRoom] = useState('Room 302');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    loadTimetable(selectedDay);
  }, [selectedDay]);

  async function loadTimetable(d: string) {
    setIsLoading(true);
    try {
      const res = await getTimetable(d);
      setTimetable(res.timetable);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddClass(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTimetable({
        subject,
        faculty,
        day,
        startTime,
        endTime,
        room,
        course: 'B.Tech CSE',
        semester: 'Semester 6',
      });
      setAddModalOpen(false);
      setSubject('');
      setFaculty('');
      loadTimetable(selectedDay);
    } catch (err) {
      alert('Failed to add class');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this scheduled class?')) {
      try {
        await deleteTimetable(id);
        loadTimetable(selectedDay);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <AuthGuard>
    <DashboardLayout
      title="Lecture Timetable"
      subtitle="Interactive class schedule, hall allocations and faculty directory"
    >
      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[10px] font-medium tracking-tight">
            <span>Semester 6 • CS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Academic Lecture Schedule</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            School of Computing & Data Sciences timetable
          </p>
        </div>

        {role === 'ADMIN' && (
          <Button
            variant="orange"
            size="sm"
            onClick={() => setAddModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Class
          </Button>
        )}
      </div>

      {/* Structured Timetable Card */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        {/* Day Selector Pills (Apple Segment Control) */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-black/[0.06]">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded-full text-xs transition duration-150 cursor-pointer ${
                selectedDay === d
                  ? 'border border-orange-500/50 bg-orange-50 text-orange-600 font-medium'
                  : 'border border-black/[0.1] text-neutral-500 hover:text-[#1d1d1f] hover:border-black/20'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Timetable List */}
        {timetable.length === 0 ? (
          <div className="py-14 text-center space-y-2">
            <p className="text-sm font-medium text-neutral-700">No scheduled lectures for {selectedDay}</p>
            <p className="text-xs text-neutral-400">Enjoy your academic break or select another day from the filter above.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {timetable.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition duration-150 hover:bg-black/[0.015] px-2 rounded-xl"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Time Tag */}
                  <div className="w-36 shrink-0 flex items-center gap-1.5 font-mono text-[11px] text-orange-600 font-medium">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <span>{item.startTime} - {item.endTime}</span>
                  </div>

                  {/* Subject & Details */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1d1d1f]">{item.subject}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-black/[0.08] text-neutral-500">
                        {item.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-neutral-400" />
                        {item.faculty}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {item.room}
                      </span>
                    </div>
                  </div>
                </div>

                {role === 'ADMIN' && (
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove Lecture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Class Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Schedule New Lecture"
        description="Add a class to the academic calendar."
      >
        <form onSubmit={handleAddClass} className="space-y-3.5">
          <Input
            label="Subject Name"
            placeholder="e.g. Distributed Operating Systems"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <Input
            label="Faculty Name"
            placeholder="e.g. Dr. Ananya Sen"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
                Day of Week
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
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
              placeholder="e.g. Hall 101"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Time"
              placeholder="09:00 AM"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <Input
              label="End Time"
              placeholder="10:30 AM"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
    </AuthGuard>
  );
}
