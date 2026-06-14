import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().optional(),
  SESSION_SECRET: z.string().default('dev-session-secret-change-me'),
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_SETUP_CODE: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_PREFIX: z.string().optional(),
  S3_PUBLIC_BASE_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default('Krown Level Enterprises <info@krownlevelent.com>'),
  CONTACT_TO_EMAIL: z.string().email().default('info@krownlevelent.com'),
  APP_ORIGIN: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  AWS_REGION: parsedEnv.AWS_REGION || parsedEnv.S3_REGION,
  AWS_ACCESS_KEY_ID: parsedEnv.AWS_ACCESS_KEY_ID || parsedEnv.S3_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: parsedEnv.AWS_SECRET_ACCESS_KEY || parsedEnv.S3_SECRET_ACCESS_KEY,
};

export function requireEnv<K extends keyof typeof env>(key: K): NonNullable<(typeof env)[K]> {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${String(key)}`);
  }
  return value as NonNullable<(typeof env)[K]>;
}
