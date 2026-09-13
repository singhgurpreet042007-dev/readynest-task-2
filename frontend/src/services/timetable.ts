import { apiClient } from './api';
import { TimetableEntry } from '../types';

export async function getTimetable(day?: string): Promise<{ success: boolean; timetable: TimetableEntry[] }> {
  const query = day && day !== 'All' ? `?day=${encodeURIComponent(day)}` : '';
  return await apiClient<{ success: boolean; timetable: TimetableEntry[] }>(`/timetable${query}`);
}

export async function createTimetable(data: Omit<TimetableEntry, 'id'>): Promise<{ success: boolean; timetable: TimetableEntry }> {
  return await apiClient<{ success: boolean; timetable: TimetableEntry }>('/timetable', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTimetable(
  id: string,
  data: Partial<TimetableEntry>
): Promise<{ success: boolean; timetable: TimetableEntry }> {
  return await apiClient<{ success: boolean; timetable: TimetableEntry }>(`/timetable/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTimetable(id: string): Promise<{ success: boolean }> {
  return await apiClient<{ success: boolean }>(`/timetable/${id}`, { method: 'DELETE' });
}
