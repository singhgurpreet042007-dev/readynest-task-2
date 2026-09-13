export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  student?: Student;
}

export interface Student {
  id: string;
  userId: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  department: string;
}

export interface Attendance {
  id: string;
  studentId?: string;
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  createdAt?: string;
}

export interface AttendanceSummary {
  overallPercentage: number;
  totalClasses: number;
  attendedClasses: number;
  lowAttendanceCount: number;
  records: Attendance[];
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  studentId?: string;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt?: string;
}

export interface TaskSummary {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Exams' | 'Events' | 'Urgent' | 'General';
  authorId?: string;
  authorName: string;
  createdAt: string;
}

export interface TimetableEntry {
  id: string;
  course: string;
  semester: string;
  subject: string;
  faculty: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface AdminStats {
  totalStudents: number;
  averageAttendance: number;
  activeTasks: number;
  totalNotices: number;
  attendanceDistribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
  weeklyActivity: Array<{
    day: string;
    classes: number;
    attendanceRate: number;
  }>;
}

export interface StudentListItem {
  id: string;
  name: string;
  email: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  department: string;
  overallAttendance: number;
  pendingTasks: number;
  status?: string;
}
