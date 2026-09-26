import { apiClient } from './api';
import { Notice } from '../types';
import { mockNotices } from './mockData';

const NOTICES_KEY = 'smart_campus_notices_data';

function getLocalNotices(): Notice[] {
  if (typeof window === 'undefined') return mockNotices;
  try {
    const stored = localStorage.getItem(NOTICES_KEY);
    if (!stored) {
      localStorage.setItem(NOTICES_KEY, JSON.stringify(mockNotices));
      return mockNotices;
    }
    return JSON.parse(stored);
  } catch {
    return mockNotices;
  }
}

function saveLocalNotices(notices: Notice[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTICES_KEY, JSON.stringify(notices));
  } catch (err) {
    console.warn('Failed saving local notices', err);
  }
}

export async function getNotices(
  category?: string,
  search?: string
): Promise<{ success: boolean; notices: Notice[] }> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const query = params.toString() ? `?${params.toString()}` : '';
  try {
    return await apiClient<{ success: boolean; notices: Notice[] }>(`/notices${query}`);
  } catch {
    let list = getLocalNotices();
    if (category && category !== 'All') {
      list = list.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    return { success: true, notices: list };
  }
}

export async function createNotice(data: {
  title: string;
  content: string;
  category?: string;
}): Promise<{ success: boolean; notice: Notice }> {
  try {
    return await apiClient<{ success: boolean; notice: Notice }>('/notices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    const list = getLocalNotices();
    const newNotice: Notice = {
      id: `not_${Date.now()}`,
      title: data.title,
      content: data.content,
      category: (data.category as any) || 'General',
      authorName: 'Campus Administration',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotice);
    saveLocalNotices(list);
    return { success: true, notice: newNotice };
  }
}

export async function deleteNotice(id: string): Promise<{ success: boolean }> {
  try {
    return await apiClient<{ success: boolean }>(`/notices/${id}`, { method: 'DELETE' });
  } catch {
    const list = getLocalNotices().filter((n) => n.id !== id);
    saveLocalNotices(list);
    return { success: true };
  }
}
