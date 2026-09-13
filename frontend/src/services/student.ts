import { apiClient } from './api';

export interface StudentProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  department: string;
  totalSubjects: number;
  totalTasks: number;
}

export async function getStudentProfile(): Promise<{ success: boolean; profile: StudentProfileData }> {
  return apiClient<{ success: boolean; profile: StudentProfileData }>('/students/profile');
}

export async function updateStudentProfile(data: {
  name?: string;
  course?: string;
  semester?: string;
  department?: string;
}): Promise<{ success: boolean; message: string; profile: StudentProfileData }> {
  return apiClient<{ success: boolean; message: string; profile: StudentProfileData }>('/students/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> {
  return apiClient<{ success: boolean; message: string }>('/auth/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
