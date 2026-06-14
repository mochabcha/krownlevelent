import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import sharp from 'sharp';
import { env, requireEnv } from '../config/env.js';
import { connectDatabase } from '../db/connect.js';
import { AdminUser, ContentBlock, Event, MediaAsset, SiteSettings, Testimonial } from '../models/index.js';

const require = createRequire(import.meta.url);
const defaultSiteContent = require('../../../shared/defaultSiteContent.json') as any;

const assetFiles: Record<string, { file: string; alt: string }> = {
  img0002: { file: 'src/assets/images/IMG_0002.webp', alt: 'Charli Smith with Krown Level banner' },
  img0050: { file: 'src/assets/images/IMG_0050.webp', alt: 'Charli Smith - Founder of Krown Level Enterprises' },
  img0094: { file: 'src/assets/images/IMG_0094.webp', alt: 'Charli Smith - Styled portrait' },
  img0155: { file: 'src/assets/images/IMG_0155.webp', alt: 'Charli Smith - Wellness & Style' },
  img0213: { file: 'src/assets/images/IMG_0213.webp', alt: 'Charli Smith - Portrait' },
  img0227: { file: 'src/assets/images/IMG_0227.webp', alt: 'Charli Smith - Disciplined and grounded' },
  img0268: { file: 'src/assets/images/IMG_0268.webp', alt: 'Charli Smith - Creative spirit' },
  img0291: { file: 'src/assets/images/IMG_0291.webp', alt: 'Charli Smith - Creative portrait' },
  img0310: { file: 'src/assets/images/IMG_0310.webp', alt: 'Charli Smith - Many hats' },
  img0319: { file: 'src/assets/images/IMG_0319.webp', alt: 'Charli Smith - Gold hat detail' },
  krownEmblem: { file: 'src/assets/logos/Krown_Emblem.png', alt: 'Krown Level Enterprises emblem' },
  krownWordMark: { file: 'src/assets/logos/Krown_WordMark.png', alt: 'Krown Level Enterprises' },
  pkEmblem: { file: 'src/assets/logos/PK_Emblem.png', alt: 'Plant Klub emblem' },
  plantKlubWordMark: { file: 'src/assets/logos/PlantKlub_WordMark.png', alt: 'Plant Klub' },
};

function s3Client() {
  return new S3Client({
    region: requireEnv('AWS_REGION'),
    credentials: {
      accessKeyId: requireEnv('AWS_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('AWS_SECRET_ACCESS_KEY'),
    },
  });
}

function withPrefix(key: string) {
  const prefix = env.S3_PREFIX?.replace(/^\/+|\/+$/g, '');
  return prefix ? `${prefix}/${key}` : key;
}

function urlFor(key: string) {
  const base =
    env.S3_PUBLIC_BASE_URL?.replace(/\/$/, '') ||
    `https://${requireEnv('S3_BUCKET')}.s3.${requireEnv('AWS_REGION')}.amazonaws.com`;
  return `${base}/${key}`;
}

async function put(key: string, body: Buffer, contentType: string) {
  await s3Client().send(
    new PutObjectCommand({
      Bucket: requireEnv('S3_BUCKET'),
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
}

function contentTypeFor(file: string) {
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg';
  if (file.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

async function seedAsset(assetKey: string, asset: { file: string; alt: string }) {
  const abs = path.resolve(process.cwd(), asset.file);
  const input = await fs.readFile(abs);
  const safeName = path.basename(asset.file).replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  const baseKey = withPrefix(`media/default/${assetKey}`);
  const originalKey = `${baseKey}/original-${safeName}`;
  const originalType = contentTypeFor(asset.file);
  const metadata = await sharp(input).metadata();
  await put(originalKey, input, originalType);

  const webp = await sharp(input).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
  const webpMeta = await sharp(webp).metadata();
  const webpKey = `${baseKey}/optimized.webp`;
  await put(webpKey, webp, 'image/webp');

  const record = await MediaAsset.findOneAndUpdate(
    { originalKey },
    {
      $set: {
        filename: path.basename(asset.file),
        alt: asset.alt,
        originalKey,
        url: urlFor(webpKey),
        mimeType: originalType,
        size: input.length,
        width: metadata.width,
        height: metadata.height,
        archived: false,
        variants: [
          {
            kind: 'original',
            key: originalKey,
            url: urlFor(originalKey),
            width: metadata.width,
            height: metadata.height,
            size: input.length,
            mimeType: originalType,
          },
          {
            kind: 'webp',
            key: webpKey,
            url: urlFor(webpKey),
            width: webpMeta.width,
            height: webpMeta.height,
            size: webp.length,
            mimeType: 'image/webp',
          },
        ],
      },
    },
    { upsert: true, new: true }
  );

  return [assetKey, String(record._id)] as const;
}

function replaceAssetKeys(value: unknown, mediaIds: Record<string, string>): unknown {
  if (Array.isArray(value)) return value.map((item) => replaceAssetKeys(item, mediaIds));
  if (!value || typeof value !== 'object') return value;

  const obj = { ...(value as Record<string, unknown>) };
  if (typeof obj.assetKey === 'string' && mediaIds[obj.assetKey]) {
    obj.mediaId = mediaIds[obj.assetKey];
  }

  for (const key of Object.keys(obj)) {
    obj[key] = replaceAssetKeys(obj[key], mediaIds);
  }
  return obj;
}

async function main() {
  await connectDatabase();
  const mediaIds = Object.fromEntries(await Promise.all(Object.entries(assetFiles).map(([key, asset]) => seedAsset(key, asset))));

  const blocks = replaceAssetKeys(defaultSiteContent.blocks, mediaIds) as typeof defaultSiteContent.blocks;
  await Promise.all(
    Object.entries(blocks).map(([key, data]) =>
      ContentBlock.findOneAndUpdate(
        { key },
        { $set: { key, label: key.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' '), data } },
        { upsert: true, new: true }
      )
    )
  );

  await Event.deleteMany({});
  await Event.insertMany(defaultSiteContent.events);
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(defaultSiteContent.testimonials);
  await SiteSettings.findOneAndUpdate(
    { singletonKey: 'site' },
    { $set: { singletonKey: 'site', ...(replaceAssetKeys(defaultSiteContent.settings, mediaIds) as Record<string, unknown>) } },
    { upsert: true, new: true }
  );

  if (process.env.RESET_ADMIN_SETUP === '1') {
    await AdminUser.deleteOne({ username: env.ADMIN_USERNAME });
  } else {
    await AdminUser.updateOne({ username: env.ADMIN_USERNAME }, { $setOnInsert: { username: env.ADMIN_USERNAME } }, { upsert: true });
  }

  console.log(`Seeded Krown Level Enterprises content and ${Object.keys(mediaIds).length} media assets.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
