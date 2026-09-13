import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let student = await prisma.student.findFirst({
      where: { userId: req.user?.userId },
      include: { attendance: true },
    });

    if (!student && req.user?.userId) {
      student = await prisma.student.create({
        data: {
          userId: req.user.userId,
          enrollmentNumber: `ENR${Math.floor(100000 + Math.random() * 900000)}`,
        },
        include: { attendance: true },
      });
    }

    const records = student?.attendance || [];
    const totalClasses = records.reduce((acc, r) => acc + r.totalClasses, 0);
    const attendedClasses = records.reduce((acc, r) => acc + r.attendedClasses, 0);
    const overallPercentage = totalClasses > 0 ? Number(((attendedClasses / totalClasses) * 100).toFixed(1)) : 0;
    const lowAttendanceCount = records.filter((r) => r.percentage < 75).length;

    res.json({
      success: true,
      overallPercentage,
      totalClasses,
      attendedClasses,
      lowAttendanceCount,
      records,
    });
  } catch (err) {
    next(err);
  }
}

export async function createAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { subject, totalClasses = 0, attendedClasses = 0 } = req.body;

    if (!subject) {
      res.status(400).json({ success: false, message: 'Subject name is required' });
      return;
    }

    const tot = Number(totalClasses);
    const att = Number(attendedClasses);
    const percentage = tot > 0 ? Number(((att / tot) * 100).toFixed(1)) : 0;

    let student = await prisma.student.findFirst({
      where: { userId: req.user?.userId },
    });

    if (!student && req.user?.userId) {
      student = await prisma.student.create({
        data: {
          userId: req.user.userId,
          enrollmentNumber: `ENR${Math.floor(100000 + Math.random() * 900000)}`,
        },
      });
    }

    if (!student) {
      res.status(400).json({ success: false, message: 'Student profile not found' });
      return;
    }

    const record = await prisma.attendance.create({
      data: {
        studentId: student.id,
        subject,
        totalClasses: tot,
        attendedClasses: att,
        percentage,
      },
    });

    res.status(201).json({ success: true, message: 'Subject attendance added', record });
  } catch (err) {
    next(err);
  }
}

export async function updateAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
    const { totalClasses, attendedClasses, mark } = req.body;

    const existing = await prisma.attendance.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Attendance record not found' });
      return;
    }

    let newTotal = totalClasses !== undefined ? Number(totalClasses) : existing.totalClasses;
    let newAttended = attendedClasses !== undefined ? Number(attendedClasses) : existing.attendedClasses;

    if (mark === 'present') {
      newTotal += 1;
      newAttended += 1;
    } else if (mark === 'absent') {
      newTotal += 1;
    }

    const percentage = newTotal > 0 ? Number(((newAttended / newTotal) * 100).toFixed(1)) : 0;

    const updated = await prisma.attendance.update({
      where: { id },
      data: {
        totalClasses: newTotal,
        attendedClasses: newAttended,
        percentage,
      },
    });

    res.json({ success: true, message: 'Attendance updated', record: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

    await prisma.attendance.delete({ where: { id } });
    res.json({ success: true, message: 'Attendance record deleted' });
  } catch (err) {
    next(err);
  }
}
