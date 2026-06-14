import { Router } from 'express';
import { asyncHandler } from '../utils/http.js';
import { getAuthState, getSession, loginAdmin, logout, setupAdmin } from '../services/authService.js';

export const authRoutes = Router();

authRoutes.get(
  '/state',
  asyncHandler(async (_req, res) => {
    res.json(await getAuthState());
  })
);

authRoutes.get(
  '/session',
  asyncHandler(async (req, res) => {
    res.json(await getSession(req));
  })
);

authRoutes.post(
  '/setup',
  asyncHandler(async (req, res) => {
    res.json({ user: await setupAdmin(req.body, req) });
  })
);

authRoutes.post(
  '/login',
  asyncHandler(async (req, res) => {
    res.json({ user: await loginAdmin(req.body, req) });
  })
);

authRoutes.post(
  '/logout',
  asyncHandler(async (req, res) => {
    await logout(req);
    res.json({ ok: true });
  })
);
