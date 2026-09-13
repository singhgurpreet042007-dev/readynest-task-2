import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export function requireRole(...roles: Array<'STUDENT' | 'ADMIN'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to [${roles.join(', ')}] roles. Your role is '${req.user.role}'.`,
      });
      return;
    }

    next();
  };
}
