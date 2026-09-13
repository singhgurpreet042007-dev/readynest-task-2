import { Router } from 'express';
import { getStats, getStudents } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('ADMIN'));

router.get('/stats', getStats);
router.get('/students', getStudents);

export default router;
