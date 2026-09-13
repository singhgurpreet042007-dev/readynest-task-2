import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../config/db';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  enrollmentNumber: z.string().min(3, 'Enrollment number is required').optional(),
  course: z.string().optional(),
  semester: z.string().optional(),
  department: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = registerSchema.parse(req.body);
    const normalizedEmail = validated.email.toLowerCase().trim();
    const enrollment = (validated.enrollmentNumber?.trim()) || `ENR${Math.floor(100000 + Math.random() * 900000)}`;

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'This email is already registered. Please sign in instead.' });
      return;
    }

    const existingEnrollment = await prisma.student.findUnique({
      where: { enrollmentNumber: enrollment },
    });

    if (existingEnrollment) {
      res.status(400).json({
        success: false,
        message: 'This Enrollment ID is already registered to an existing student.',
      });
      return;
    }

    const hashedPassword = await hashPassword(validated.password);

    const user = await prisma.user.create({
      data: {
        name: validated.name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'STUDENT',
        student: {
          create: {
            enrollmentNumber: enrollment,
            course: validated.course?.trim() || 'B.Tech Computer Science',
            semester: validated.semester?.trim() || 'Semester 1',
            department: validated.department?.trim() || 'School of Engineering',
          },
        },
      },
      include: { student: true },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: 'STUDENT',
      name: user.name,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: user.student,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: err.errors[0]?.message || 'Validation error' });
      return;
    }
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : '';
      const message = target.includes('enrollmentNumber')
        ? 'This Enrollment ID is already registered to an existing student.'
        : 'This email is already registered. Please sign in instead.';
      res.status(400).json({ success: false, message });
      return;
    }
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = loginSchema.parse(req.body);
    const normalizedEmail = validated.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { student: true },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Account does not exist with this email. Please register first.',
        code: 'ACCOUNT_NOT_FOUND',
      });
      return;
    }

    const passwordMatches = await comparePassword(validated.password, user.password);
    if (!passwordMatches) {
      res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify your credentials.',
        code: 'INVALID_PASSWORD',
      });
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'STUDENT' | 'ADMIN',
      name: user.name,
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: user.student,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: err.errors[0]?.message || 'Validation error' });
      return;
    }
    next(err);
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { student: true },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found in database' });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: user.student,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, message: 'Current password and new password are required' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const matches = await comparePassword(currentPassword, user.password);
    if (!matches) {
      res.status(400).json({ success: false, message: 'Current password does not match' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}

