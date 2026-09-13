import { Router } from 'express';
import {
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
} from '../controllers/timetableController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getTimetable);
router.post('/', authMiddleware, requireRole('ADMIN'), createTimetable);
router.put('/:id', authMiddleware, requireRole('ADMIN'), updateTimetable);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteTimetable);

export default router;
