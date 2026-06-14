import type { NextFunction, Request, Response } from 'express';
import { getSession } from '../services/authService.js';

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = await getSession(req);
  if (!session.authenticated) {
    return res.status(401).json({ error: 'Admin authentication required' });
  }
  return next();
}
