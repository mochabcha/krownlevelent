import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { getSiteContent } from '../services/siteContentService.js';
import { getMediaById } from '../services/mediaService.js';
import { sendContactEmail } from '../services/emailService.js';
import { asyncHandler, HttpError } from '../utils/http.js';

export const publicRoutes = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
});

publicRoutes.get(
  '/site-content',
  asyncHandler(async (_req, res) => {
    res.json(await getSiteContent());
  })
);

publicRoutes.post(
  '/contact',
  contactLimiter,
  asyncHandler(async (req, res) => {
    await sendContactEmail(req.body);
    res.json({ ok: true });
  })
);

publicRoutes.get(
  '/media/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id || Array.isArray(id)) throw new HttpError(400, 'Invalid media id');
    res.json(await getMediaById(id));
  })
);
