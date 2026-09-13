import { Router } from 'express';
import { register, login, getMe, updatePassword } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.put('/password', authMiddleware, updatePassword);

export default router;
