import { Router } from 'express';
import multer from 'multer';
import {
  archiveMedia,
  listMedia,
  processImageBatch,
  updateMedia,
} from '../services/mediaService.js';
import {
  createEvent,
  createTestimonial,
  getSettings,
  listContentBlocks,
  listEvents,
  listTestimonials,
  updateContentBlock,
  updateContentBlockImage,
  updateEvent,
  updateSettings,
  updateTestimonial,
} from '../services/siteContentService.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { asyncHandler, HttpError } from '../utils/http.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 20,
    fileSize: 25 * 1024 * 1024,
  },
});

export const adminRoutes = Router();

adminRoutes.use(requireAdmin);

function routeParam(value: string | string[] | undefined) {
  if (!value || Array.isArray(value)) throw new HttpError(400, 'Invalid route parameter');
  return value;
}

adminRoutes.get(
  '/content',
  asyncHandler(async (_req, res) => {
    res.json(await listContentBlocks());
  })
);

adminRoutes.patch(
  '/content/:blockKey',
  asyncHandler(async (req, res) => {
    res.json(await updateContentBlock(routeParam(req.params.blockKey), req.body.data || req.body));
  })
);

adminRoutes.post(
  '/content/:blockKey/image',
  asyncHandler(async (req, res) => {
    const { path, mediaId, alt } = req.body;
    if (!Array.isArray(path) || !mediaId) throw new HttpError(400, 'path and mediaId are required');
    res.json(await updateContentBlockImage(routeParam(req.params.blockKey), path, mediaId, alt));
  })
);

adminRoutes.get(
  '/events',
  asyncHandler(async (_req, res) => {
    res.json(await listEvents(true));
  })
);

adminRoutes.post(
  '/events',
  asyncHandler(async (req, res) => {
    res.status(201).json(await createEvent(req.body));
  })
);

adminRoutes.patch(
  '/events/:id',
  asyncHandler(async (req, res) => {
    res.json(await updateEvent(routeParam(req.params.id), req.body));
  })
);

adminRoutes.get(
  '/testimonials',
  asyncHandler(async (_req, res) => {
    res.json(await listTestimonials(true));
  })
);

adminRoutes.post(
  '/testimonials',
  asyncHandler(async (req, res) => {
    res.status(201).json(await createTestimonial(req.body));
  })
);

adminRoutes.patch(
  '/testimonials/:id',
  asyncHandler(async (req, res) => {
    res.json(await updateTestimonial(routeParam(req.params.id), req.body));
  })
);

adminRoutes.get(
  '/settings',
  asyncHandler(async (_req, res) => {
    res.json(await getSettings());
  })
);

adminRoutes.patch(
  '/settings',
  asyncHandler(async (req, res) => {
    res.json(await updateSettings(req.body));
  })
);

adminRoutes.get(
  '/media',
  asyncHandler(async (req, res) => {
    res.json(await listMedia(req.query.includeArchived === 'true'));
  })
);

adminRoutes.post(
  '/media/batch',
  upload.array('images', 20),
  asyncHandler(async (req, res) => {
    const files = req.files;
    if (!Array.isArray(files) || files.length === 0) throw new HttpError(400, 'At least one image is required');
    res.status(201).json(await processImageBatch(files));
  })
);

adminRoutes.patch(
  '/media/:id',
  asyncHandler(async (req, res) => {
    res.json(await updateMedia(routeParam(req.params.id), req.body));
  })
);

adminRoutes.post(
  '/media/:id/archive',
  asyncHandler(async (req, res) => {
    res.json(await archiveMedia(routeParam(req.params.id)));
  })
);
