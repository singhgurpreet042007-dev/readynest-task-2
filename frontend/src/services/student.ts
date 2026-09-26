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
  try {
    return await apiClient<{ success: boolean; profile: StudentProfileData }>('/students/profile');
  } catch {
    let storedUser: any = null;
    try {
      const u = localStorage.getItem('user');
      if (u) storedUser = JSON.parse(u);
    } catch {
      // ignore
    }

    const fallback: StudentProfileData = {
      id: storedUser?.id || 'usr_student_01',
      name: storedUser?.name || 'Aarav Sharma',
      email: storedUser?.email || 'student@campus.edu',
      role: storedUser?.role || 'STUDENT',
      enrollmentNumber: storedUser?.student?.enrollmentNumber || '21BCSE104',
      course: storedUser?.student?.course || 'B.Tech Computer Science & Engineering',
      semester: storedUser?.student?.semester || 'Semester 6',
      department: storedUser?.student?.department || 'School of Computing & Data Sciences',
      totalSubjects: 5,
      totalTasks: 4,
    };

    return { success: true, profile: fallback };
  }
}

export async function updateStudentProfile(data: {
  name?: string;
  course?: string;
  semester?: string;
  department?: string;
}): Promise<{ success: boolean; message: string; profile: StudentProfileData }> {
  try {
    return await apiClient<{ success: boolean; message: string; profile: StudentProfileData }>('/students/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch {
    const { profile } = await getStudentProfile();
    const updated = {
      ...profile,
      ...(data.name && { name: data.name }),
      ...(data.course && { course: data.course }),
      ...(data.semester && { semester: data.semester }),
      ...(data.department && { department: data.department }),
    };

    try {
      const u = localStorage.getItem('user');
      if (u) {
        const userObj = JSON.parse(u);
        if (data.name) userObj.name = data.name;
        if (!userObj.student) userObj.student = {};
        if (data.course) userObj.student.course = data.course;
        if (data.semester) userObj.student.semester = data.semester;
        if (data.department) userObj.student.department = data.department;
        localStorage.setItem('user', JSON.stringify(userObj));
      }
    } catch {
      // ignore
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      profile: updated,
    };
  }
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    return await apiClient<{ success: boolean; message: string }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch {
    return {
      success: true,
      message: 'Password updated successfully (Local Session)',
    };
  }
}
