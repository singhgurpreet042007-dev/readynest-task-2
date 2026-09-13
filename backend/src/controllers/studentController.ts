import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        student: {
          include: {
            attendance: true,
            tasks: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({
      success: true,
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrollmentNumber: user.student?.enrollmentNumber || 'N/A',
        course: user.student?.course || 'General Program',
        semester: user.student?.semester || 'Semester 1',
        department: user.student?.department || 'Department of Academics',
        totalSubjects: user.student?.attendance.length || 0,
        totalTasks: user.student?.tasks.length || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { name, course, semester, department } = req.body;

    if (name) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { name },
      });
    }

    let student = await prisma.student.findFirst({
      where: { userId: req.user.userId },
    });

    if (student) {
      student = await prisma.student.update({
        where: { id: student.id },
        data: {
          ...(course !== undefined && { course }),
          ...(semester !== undefined && { semester }),
          ...(department !== undefined && { department }),
        },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { student: { include: { attendance: true, tasks: true } } },
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        id: updatedUser?.id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        role: updatedUser?.role,
        enrollmentNumber: updatedUser?.student?.enrollmentNumber || 'N/A',
        course: updatedUser?.student?.course || 'General Program',
        semester: updatedUser?.student?.semester || 'Semester 1',
        department: updatedUser?.student?.department || 'Department of Academics',
        totalSubjects: updatedUser?.student?.attendance.length || 0,
        totalTasks: updatedUser?.student?.tasks.length || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}
