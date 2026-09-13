import { apiClient } from './api';
import { Notice } from '../types';

export async function getNotices(
  category?: string,
  search?: string
): Promise<{ success: boolean; notices: Notice[] }> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const query = params.toString() ? `?${params.toString()}` : '';
  return await apiClient<{ success: boolean; notices: Notice[] }>(`/notices${query}`);
}

export async function createNotice(data: {
  title: string;
  content: string;
  category?: string;
}): Promise<{ success: boolean; notice: Notice }> {
  return await apiClient<{ success: boolean; notice: Notice }>('/notices', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteNotice(id: string): Promise<{ success: boolean }> {
  return await apiClient<{ success: boolean }>(`/notices/${id}`, { method: 'DELETE' });
}
