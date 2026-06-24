import argon2 from "argon2";
import type { Request } from "express";
import { env } from "../config/env.js";
import { isDatabaseConnected } from "../db/connect.js";
import { AdminUser } from "../models/index.js";
import { loginSchema, setupSchema } from "../schemas/siteSchemas.js";
import { HttpError } from "../utils/http.js";

declare module "express-session" {
  interface SessionData {
    adminUserId?: string;
  }
}

function saveSession(req: Request) {
  return new Promise<void>((resolve, reject) => {
    req.session.save((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

export async function getAuthState() {
  if (!isDatabaseConnected()) {
    return { setupRequired: true, authenticated: false, mongoRequired: true };
  }

  const user = await AdminUser.findOne({
    passwordHash: { $exists: true, $ne: null },
  });
  return {
    setupRequired: !user,
    authenticated: false,
    username: user?.username ?? env.ADMIN_USERNAME,
  };
}

export async function setupAdmin(input: unknown, req: Request) {
  if (!isDatabaseConnected())
    throw new HttpError(503, "MongoDB is required for admin setup");
  const payload = setupSchema.parse(input);
  if (!env.ADMIN_SETUP_CODE || payload.setupCode !== env.ADMIN_SETUP_CODE) {
    throw new HttpError(403, "Invalid setup code");
  }

  const existing = await AdminUser.findOne({
    passwordHash: { $exists: true, $ne: null },
  });
  if (existing)
    throw new HttpError(409, "Admin password is already configured");

  const passwordHash = await argon2.hash(payload.password, {
    type: argon2.argon2id,
  });
  const user = await AdminUser.findOneAndUpdate(
    { username: payload.username },
    {
      $set: {
        username: payload.username,
        passwordHash,
        passwordSetAt: new Date(),
      },
    },
    { upsert: true, new: true },
  );

  req.session.adminUserId = String(user._id);
  await saveSession(req);
  return { id: String(user._id), username: user.username };
}

export async function loginAdmin(input: unknown, req: Request) {
  if (!isDatabaseConnected())
    throw new HttpError(503, "MongoDB is required for admin login");
  const payload = loginSchema.parse(input);

  const user = await AdminUser.findOne({ username: payload.username });
  if (!user?.passwordHash)
    throw new HttpError(401, "Invalid username or password");
  const valid = await argon2.verify(user.passwordHash, payload.password);
  if (!valid) throw new HttpError(401, "Invalid username or password");

  req.session.adminUserId = String(user._id);
  await saveSession(req);
  return { id: String(user._id), username: user.username };
}

export async function getSession(req: Request) {
  if (!req.session.adminUserId || !isDatabaseConnected())
    return { authenticated: false };
  const user = (await AdminUser.findById(
    req.session.adminUserId,
  ).lean()) as any;
  if (!user) return { authenticated: false };
  return {
    authenticated: true,
    user: { id: String(user._id), username: user.username },
  };
}

export function logout(req: Request) {
  return new Promise<void>((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
