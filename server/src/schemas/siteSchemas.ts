import { z } from 'zod';

export const imageRefSchema = z.object({
  assetKey: z.string().optional(),
  mediaId: z.string().optional(),
  url: z.string().url().optional(),
  alt: z.string().default(''),
});

export const contentBlockSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  data: z.record(z.string(), z.unknown()),
});

export const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().optional().default(''),
  location: z.string().optional().default(''),
  description: z.string().optional().default(''),
  price: z.string().optional().default(''),
  ctaText: z.string().optional().default('Reserve Your Spot'),
  ctaHref: z.string().optional().default('#contact'),
  ctaVariant: z.string().optional().default('primary'),
  active: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().optional().default(''),
  active: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const settingsSchema = z.object({
  contact: z.record(z.string(), z.unknown()).default({}),
  socialLinks: z.array(z.record(z.string(), z.unknown())).default([]),
  calendlyUrl: z.string().optional().default(''),
  logos: z.record(z.string(), z.unknown()).default({}),
});

export const contactSubmissionSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().default(''),
  interest: z.string().min(1).max(100),
  contactMethod: z.string().max(50).optional().default(''),
  bestTime: z.string().max(120).optional().default(''),
  message: z.string().max(4000).optional().default(''),
  company: z.string().max(0).optional().default(''),
});

export const setupSchema = z
  .object({
    username: z.string().min(1),
    setupCode: z.string().min(1),
    password: z.string().min(12),
    confirmPassword: z.string().min(12),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type EventInput = z.infer<typeof eventSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
