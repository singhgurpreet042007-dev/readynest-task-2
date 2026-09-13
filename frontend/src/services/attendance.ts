import { apiClient } from './api';
import { AttendanceSummary, Attendance } from '../types';

export async function getAttendance(): Promise<AttendanceSummary> {
  return await apiClient<AttendanceSummary>('/attendance');
}

export async function createAttendance(data: {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
}): Promise<{ success: boolean; record: Attendance }> {
  return await apiClient<{ success: boolean; record: Attendance }>('/attendance', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAttendance(
  id: string,
  data: { mark?: 'present' | 'absent'; totalClasses?: number; attendedClasses?: number }
): Promise<{ success: boolean; record: Attendance }> {
  return await apiClient<{ success: boolean; record: Attendance }>(`/attendance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAttendance(id: string): Promise<{ success: boolean }> {
  return await apiClient<{ success: boolean }>(`/attendance/${id}`, { method: 'DELETE' });
}
