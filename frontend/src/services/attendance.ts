import { apiClient } from './api';
import { AttendanceSummary, Attendance } from '../types';
import { mockAttendanceRecords } from './mockData';

const ATT_KEY = 'smart_campus_attendance_data';

function getLocalAttendance(): Attendance[] {
  if (typeof window === 'undefined') return mockAttendanceRecords;
  try {
    const stored = localStorage.getItem(ATT_KEY);
    if (!stored) {
      localStorage.setItem(ATT_KEY, JSON.stringify(mockAttendanceRecords));
      return mockAttendanceRecords;
    }
    return JSON.parse(stored);
  } catch {
    return mockAttendanceRecords;
  }
}

function saveLocalAttendance(records: Attendance[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ATT_KEY, JSON.stringify(records));
  } catch (err) {
    console.warn('Failed saving local attendance', err);
  }
}

function calculateSummary(records: Attendance[]): AttendanceSummary {
  let totalClasses = 0;
  let attendedClasses = 0;
  let lowAttendanceCount = 0;

  for (const r of records) {
    totalClasses += r.totalClasses;
    attendedClasses += r.attendedClasses;
    if (r.percentage < 75) {
      lowAttendanceCount++;
    }
  }

  const overallPercentage = totalClasses > 0 ? Number(((attendedClasses / totalClasses) * 100).toFixed(1)) : 0;

  return {
    overallPercentage,
    totalClasses,
    attendedClasses,
    lowAttendanceCount,
    records,
  };
}

export async function getAttendance(): Promise<AttendanceSummary> {
  try {
    return await apiClient<AttendanceSummary>('/attendance');
  } catch {
    const records = getLocalAttendance();
    return calculateSummary(records);
  }
}

export async function createAttendance(data: {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
}): Promise<{ success: boolean; record: Attendance }> {
  try {
    return await apiClient<{ success: boolean; record: Attendance }>('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    const records = getLocalAttendance();
    const pct = data.totalClasses > 0 ? Number(((data.attendedClasses / data.totalClasses) * 100).toFixed(1)) : 0;
    const newRecord: Attendance = {
      id: `att_${Date.now()}`,
      subject: data.subject,
      totalClasses: data.totalClasses,
      attendedClasses: data.attendedClasses,
      percentage: pct,
    };
    records.push(newRecord);
    saveLocalAttendance(records);
    return { success: true, record: newRecord };
  }
}

export async function updateAttendance(
  id: string,
  data: { mark?: 'present' | 'absent'; totalClasses?: number; attendedClasses?: number }
): Promise<{ success: boolean; record: Attendance }> {
  try {
    return await apiClient<{ success: boolean; record: Attendance }>(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch {
    const records = getLocalAttendance();
    const idx = records.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Attendance record not found');

    const item = records[idx];
    if (data.mark === 'present') {
      item.totalClasses += 1;
      item.attendedClasses += 1;
    } else if (data.mark === 'absent') {
      item.totalClasses += 1;
    } else {
      if (data.totalClasses !== undefined) item.totalClasses = data.totalClasses;
      if (data.attendedClasses !== undefined) item.attendedClasses = data.attendedClasses;
    }

    item.percentage = item.totalClasses > 0 ? Number(((item.attendedClasses / item.totalClasses) * 100).toFixed(1)) : 0;
    records[idx] = item;
    saveLocalAttendance(records);
    return { success: true, record: item };
  }
}

export async function deleteAttendance(id: string): Promise<{ success: boolean }> {
  try {
    return await apiClient<{ success: boolean }>(`/attendance/${id}`, { method: 'DELETE' });
  } catch {
    const records = getLocalAttendance().filter((r) => r.id !== id);
    saveLocalAttendance(records);
    return { success: true };
  }
}
