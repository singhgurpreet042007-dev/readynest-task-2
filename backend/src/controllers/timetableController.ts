import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getTimetable(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { day, semester, course } = req.query;

    const timetable = await prisma.timetable.findMany({
      where: {
        ...(day && day !== 'All' ? { day: String(day) } : {}),
        ...(semester ? { semester: String(semester) } : {}),
        ...(course ? { course: String(course) } : {}),
      },
      orderBy: { startTime: 'asc' },
    });

    res.json({ success: true, timetable });
  } catch (err) {
    next(err);
  }
}

export async function createTimetable(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { subject, faculty, day, startTime, endTime, room = 'Room 101', course = 'B.Tech CSE', semester = 'Semester 6' } = req.body;

    if (!subject || !faculty || !day || !startTime || !endTime) {
      res.status(400).json({ success: false, message: 'Subject, faculty, day, and timings are required' });
      return;
    }

    const item = await prisma.timetable.create({
      data: {
        subject,
        faculty,
        day,
        startTime,
        endTime,
        room,
        course,
        semester,
      },
    });

    res.status(201).json({ success: true, message: 'Class schedule added', timetable: item });
  } catch (err) {
    next(err);
  }
}

export async function updateTimetable(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
    const { subject, faculty, day, startTime, endTime, room } = req.body;

    const updated = await prisma.timetable.update({
      where: { id },
      data: {
        ...(subject && { subject }),
        ...(faculty && { faculty }),
        ...(day && { day }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(room && { room }),
      },
    });

    res.json({ success: true, message: 'Schedule updated', timetable: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteTimetable(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

    await prisma.timetable.delete({ where: { id } });
    res.json({ success: true, message: 'Class schedule removed' });
  } catch (err) {
    next(err);
  }
}
