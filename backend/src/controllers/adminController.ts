import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getStats(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const [studentCount, activeTasks, totalNotices, attendanceRecords, timetableRecords] = await Promise.all([
      prisma.student.count(),
      prisma.task.count({ where: { status: { not: 'COMPLETED' } } }),
      prisma.notice.count(),
      prisma.attendance.findMany(),
      prisma.timetable.findMany(),
    ]);

    const avgAttendance =
      attendanceRecords.length > 0
        ? Number((attendanceRecords.reduce((sum, r) => sum + r.percentage, 0) / attendanceRecords.length).toFixed(1))
        : 0;

    // Calculate real attendance distribution
    const range90to100 = attendanceRecords.filter((r) => r.percentage >= 90).length;
    const range75to89 = attendanceRecords.filter((r) => r.percentage >= 75 && r.percentage < 90).length;
    const range65to74 = attendanceRecords.filter((r) => r.percentage >= 65 && r.percentage < 75).length;
    const rangeUnder65 = attendanceRecords.filter((r) => r.percentage < 65).length;
    const totalAttRecords = attendanceRecords.length || 1;

    const attendanceDistribution = [
      {
        range: '90-100%',
        count: range90to100,
        percentage: Number(((range90to100 / totalAttRecords) * 100).toFixed(1)),
      },
      {
        range: '75-89%',
        count: range75to89,
        percentage: Number(((range75to89 / totalAttRecords) * 100).toFixed(1)),
      },
      {
        range: '65-74%',
        count: range65to74,
        percentage: Number(((range65to74 / totalAttRecords) * 100).toFixed(1)),
      },
      {
        range: '<65% (Critical)',
        count: rangeUnder65,
        percentage: Number(((rangeUnder65 / totalAttRecords) * 100).toFixed(1)),
      },
    ];

    // Calculate real weekly activity from timetable
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const fullDays: Record<string, string> = {
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
    };

    const weeklyActivity = days.map((shortDay) => {
      const dayName = fullDays[shortDay];
      const count = timetableRecords.filter((t) => t.day.toLowerCase() === dayName.toLowerCase()).length;
      return {
        day: shortDay,
        classes: count,
        attendanceRate: Math.round(avgAttendance),
      };
    });

    res.json({
      success: true,
      stats: {
        totalStudents: studentCount,
        averageAttendance: avgAttendance,
        activeTasks,
        totalNotices,
        attendanceDistribution,
        weeklyActivity,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getStudents(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
        attendance: true,
        tasks: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const formatted = students.map((s) => {
      const tot = s.attendance.reduce((a, r) => a + r.totalClasses, 0);
      const att = s.attendance.reduce((a, r) => a + r.attendedClasses, 0);
      const pct = tot > 0 ? Number(((att / tot) * 100).toFixed(1)) : 0;

      let status = 'Good Standing';
      if (pct < 75 && tot > 0) {
        status = 'Attendance Warning (<75%)';
      } else if (pct >= 90) {
        status = 'Dean’s List';
      }

      return {
        id: s.id,
        name: s.user.name,
        email: s.user.email,
        enrollmentNumber: s.enrollmentNumber,
        course: s.course,
        semester: s.semester,
        department: s.department,
        overallAttendance: pct,
        pendingTasks: s.tasks.filter((t) => t.status !== 'COMPLETED').length,
        status,
        joinedAt: s.createdAt,
      };
    });

    res.json({ success: true, students: formatted });
  } catch (err) {
    next(err);
  }
}
