import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getTasks(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let student = await prisma.student.findFirst({
      where: { userId: req.user?.userId },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student && req.user?.userId) {
      student = await prisma.student.create({
        data: {
          userId: req.user.userId,
          enrollmentNumber: `ENR${Math.floor(100000 + Math.random() * 900000)}`,
        },
        include: { tasks: true },
      });
    }

    const tasks = student?.tasks || [];

    res.json({
      success: true,
      tasks,
      stats: {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === 'TODO').length,
        inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
        completed: tasks.filter((t) => t.status === 'COMPLETED').length,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function createTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, description, deadline, status = 'TODO', priority = 'MEDIUM' } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: 'Task title is required' });
      return;
    }

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

    const task = await prisma.task.create({
      data: {
        studentId: student.id,
        title,
        description: description || null,
        deadline: deadline ? new Date(deadline) : null,
        status,
        priority,
      },
    });

    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
    const { title, description, deadline, status, priority } = req.body;

    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
      },
    });

    res.json({ success: true, message: 'Task updated', task: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

    await prisma.task.delete({ where: { id } });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
}
