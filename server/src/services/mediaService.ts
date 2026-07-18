import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import heicConvert from 'heic-convert';
import sharp from 'sharp';
import { randomUUID } from 'node:crypto';
import { env, requireEnv } from '../config/env.js';
import { isDatabaseConnected } from '../db/connect.js';
import { MediaAsset } from '../models/index.js';
import { HttpError } from '../utils/http.js';

const MAX_CONCURRENT_IMAGE_JOBS = 3;
const HEIC_MIME_TYPES = new Set(['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence']);
const HEIC_FILE_EXTENSIONS = new Set(['.heic', '.heif']);

function isHeicImage(file: Express.Multer.File) {
  const mimeType = file.mimetype.toLowerCase();
  const extension = file.originalname.toLowerCase().match(/\.[^.]+$/)?.[0];
  return HEIC_MIME_TYPES.has(mimeType) || (extension ? HEIC_FILE_EXTENSIONS.has(extension) : false);
}

async function normalizeImageBuffer(file: Express.Multer.File, isHeic: boolean) {
  if (!isHeic) return file.buffer;

  try {
    return await heicConvert({
      buffer: file.buffer,
      format: 'JPEG',
      quality: 0.92,
    });
  } catch {
    throw new HttpError(400, `${file.originalname} could not be read as a HEIC/HEIF image`);
  }
}

function getS3Client() {
  return new S3Client({
    region: requireEnv('S3_REGION'),
    credentials: {
      accessKeyId: requireEnv('S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('S3_SECRET_ACCESS_KEY'),
    },
  });
}

function publicUrlFor(key: string) {
  const baseUrl =
    env.S3_PUBLIC_BASE_URL?.replace(/\/$/, '') ||
    `https://${requireEnv('S3_BUCKET')}.s3.${requireEnv('S3_REGION')}.amazonaws.com`;
  return `${baseUrl}/${key}`;
}

function prefixedKey(key: string) {
  const prefix = env.S3_PREFIX?.replace(/^\/+|\/+$/g, '');
  return prefix ? `${prefix}/${key}` : key;
}

async function putObject(key: string, body: Buffer, contentType: string) {
  await getS3Client().send(
    new PutObjectCommand({
      Bucket: requireEnv('S3_BUCKET'),
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
  return publicUrlFor(key);
}

async function processAndUploadImage(file: Express.Multer.File) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for media uploads');
  const isHeic = isHeicImage(file);
  if (!file.mimetype.startsWith('image/') && !isHeic) throw new HttpError(400, `${file.originalname} is not an image`);

  const id = randomUUID();
  const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  const baseKey = prefixedKey(`media/${id}`);
  const processableBuffer = await normalizeImageBuffer(file, isHeic);
  let metadata: sharp.Metadata;

  try {
    metadata = await sharp(processableBuffer).metadata();
  } catch {
    throw new HttpError(400, `${file.originalname} is not a supported image`);
  }
  const originalKey = `${baseKey}/original-${safeName}`;
  const originalUrl = await putObject(originalKey, file.buffer, file.mimetype);

  const webpBuffer = await sharp(processableBuffer)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const webpMetadata = await sharp(webpBuffer).metadata();
  const webpKey = `${baseKey}/optimized.webp`;
  const webpUrl = await putObject(webpKey, webpBuffer, 'image/webp');

  const asset = await MediaAsset.create({
    filename: file.originalname,
    alt: '',
    originalKey,
    url: webpUrl,
    mimeType: file.mimetype,
    size: file.size,
    width: metadata.width,
    height: metadata.height,
    variants: [
      {
        kind: 'original',
        key: originalKey,
        url: originalUrl,
        width: metadata.width,
        height: metadata.height,
        size: file.size,
        mimeType: file.mimetype,
      },
      {
        kind: 'webp',
        key: webpKey,
        url: webpUrl,
        width: webpMetadata.width,
        height: webpMetadata.height,
        size: webpBuffer.length,
        mimeType: 'image/webp',
      },
    ],
  });

  const item = asset.toObject();
  return { ...item, id: String(item._id), _id: undefined, __v: undefined };
}

export async function processImageBatch(files: Express.Multer.File[]) {
  const results: unknown[] = [];
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const current = files[index];
      index += 1;
      results.push(await processAndUploadImage(current));
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(MAX_CONCURRENT_IMAGE_JOBS, files.length) }, () => worker())
  );
  return results;
}

export async function listMedia(includeArchived = false) {
  if (!isDatabaseConnected()) return [];
  const items = await MediaAsset.find(includeArchived ? {} : { archived: false }).sort({ createdAt: -1 }).lean();
  return items.map((item) => ({ ...item, id: String(item._id), _id: undefined, __v: undefined }));
}

export async function getMediaById(id: string) {
  if (!isDatabaseConnected()) throw new HttpError(404, 'Media asset not found');
  const asset = (await MediaAsset.findById(id).lean()) as any;
  if (!asset || asset.archived) throw new HttpError(404, 'Media asset not found');
  return { ...asset, id: String(asset._id), _id: undefined, __v: undefined };
}

export async function updateMedia(id: string, input: { alt?: string; archived?: boolean }) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for media');
  const asset = await MediaAsset.findByIdAndUpdate(id, { $set: input }, { new: true });
  if (!asset) throw new HttpError(404, 'Media asset not found');
  const item = asset.toObject();
  return { ...item, id: String(item._id), _id: undefined, __v: undefined };
}

export async function archiveMedia(id: string) {
  return updateMedia(id, { archived: true });
}

export function hasS3Config() {
  return Boolean(
    env.S3_REGION &&
      env.S3_ACCESS_KEY_ID &&
      env.S3_SECRET_ACCESS_KEY &&
      env.S3_BUCKET
  );
}
