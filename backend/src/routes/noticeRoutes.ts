import { Router } from 'express';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getNotices);
router.post('/', authMiddleware, requireRole('ADMIN'), createNotice);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteNotice);

export default router;
