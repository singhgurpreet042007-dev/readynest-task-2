import { apiClient } from './api';
import { AdminStats, StudentListItem } from '../types';

export async function getAdminStats(): Promise<AdminStats> {
  const res = await apiClient<{ success: boolean; stats: AdminStats }>('/admin/stats');
  return res.stats;
}

export async function getAdminStudents(): Promise<StudentListItem[]> {
  const res = await apiClient<{ success: boolean; students: StudentListItem[] }>('/admin/students');
  return res.students;
}
