import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/db';

export async function getNotices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, search } = req.query;

    const notices = await prisma.notice.findMany({
      where: {
        ...(category && category !== 'All' ? { category: String(category) } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: String(search) } },
                { content: { contains: String(search) } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, notices });
  } catch (err) {
    next(err);
  }
}

export async function createNotice(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, content, category = 'General' } = req.body;

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and content are required' });
      return;
    }

    let authorId = req.user?.userId;
    let authorName = req.user?.name;

    if (authorId) {
      const authorExists = await prisma.user.findUnique({ where: { id: authorId } });
      if (!authorExists) {
        authorId = undefined;
      }
    }

    if (!authorId) {
      const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!adminUser) {
        res.status(400).json({ success: false, message: 'No authorized administrative account found' });
        return;
      }
      authorId = adminUser.id;
      authorName = adminUser.name;
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        category,
        authorId,
        authorName: authorName || 'Campus Administration',
      },
    });

    res.status(201).json({ success: true, message: 'Notice published successfully', notice });
  } catch (err) {
    next(err);
  }
}

export async function deleteNotice(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

    await prisma.notice.delete({ where: { id } });
    res.json({ success: true, message: 'Notice deleted' });
  } catch (err) {
    next(err);
  }
}
