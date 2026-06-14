import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/src/app.js';
import { connectDatabase } from '../server/src/db/connect.js';
import { seedDefaultContent } from '../server/src/services/siteContentService.js';

const app = createApp();
let ready: Promise<void> | null = null;

async function ensureReady() {
  ready ??= connectDatabase().then(async () => {
    await seedDefaultContent();
  });
  return ready;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureReady();
  return app(req, res);
}
