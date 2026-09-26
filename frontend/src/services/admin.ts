import { apiClient } from './api';
import { AdminStats, StudentListItem } from '../types';
import { mockAdminStats, mockStudentList } from './mockData';

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const res = await apiClient<{ success: boolean; stats: AdminStats }>('/admin/stats');
    return res.stats;
  } catch {
    return mockAdminStats;
  }
}

export async function getAdminStudents(): Promise<StudentListItem[]> {
  try {
    const res = await apiClient<{ success: boolean; students: StudentListItem[] }>('/admin/students');
    return res.students;
  } catch {
    return mockStudentList;
  }
}
