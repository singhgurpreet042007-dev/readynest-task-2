import { apiClient } from './api';
import { TimetableEntry } from '../types';
import { mockTimetable } from './mockData';

const TT_KEY = 'smart_campus_timetable_data';

function getLocalTimetable(): TimetableEntry[] {
  if (typeof window === 'undefined') return mockTimetable;
  try {
    const stored = localStorage.getItem(TT_KEY);
    if (!stored) {
      localStorage.setItem(TT_KEY, JSON.stringify(mockTimetable));
      return mockTimetable;
    }
    return JSON.parse(stored);
  } catch {
    return mockTimetable;
  }
}

function saveLocalTimetable(entries: TimetableEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TT_KEY, JSON.stringify(entries));
  } catch (err) {
    console.warn('Failed saving local timetable', err);
  }
}

export async function getTimetable(day?: string): Promise<{ success: boolean; timetable: TimetableEntry[] }> {
  const query = day && day !== 'All' ? `?day=${encodeURIComponent(day)}` : '';
  try {
    return await apiClient<{ success: boolean; timetable: TimetableEntry[] }>(`/timetable${query}`);
  } catch {
    let list = getLocalTimetable();
    if (day && day !== 'All') {
      list = list.filter((e) => e.day.toLowerCase() === day.toLowerCase());
    }
    return { success: true, timetable: list };
  }
}

export async function createTimetable(data: Omit<TimetableEntry, 'id'>): Promise<{ success: boolean; timetable: TimetableEntry }> {
  try {
    return await apiClient<{ success: boolean; timetable: TimetableEntry }>('/timetable', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    const list = getLocalTimetable();
    const newEntry: TimetableEntry = {
      ...data,
      id: `tt_${Date.now()}`,
    };
    list.push(newEntry);
    saveLocalTimetable(list);
    return { success: true, timetable: newEntry };
  }
}

export async function updateTimetable(
  id: string,
  data: Partial<TimetableEntry>
): Promise<{ success: boolean; timetable: TimetableEntry }> {
  try {
    return await apiClient<{ success: boolean; timetable: TimetableEntry }>(`/timetable/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch {
    const list = getLocalTimetable();
    const idx = list.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Timetable entry not found');
    list[idx] = { ...list[idx], ...data };
    saveLocalTimetable(list);
    return { success: true, timetable: list[idx] };
  }
}

export async function deleteTimetable(id: string): Promise<{ success: boolean }> {
  try {
    return await apiClient<{ success: boolean }>(`/timetable/${id}`, { method: 'DELETE' });
  } catch {
    const list = getLocalTimetable().filter((e) => e.id !== id);
    saveLocalTimetable(list);
    return { success: true };
  }
}
