import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    console.warn('MONGODB_URI is not configured. Public API will use fallback content; admin writes require MongoDB.');
    return null;
  }

  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(env.MONGODB_URI);
  return mongoose.connection;
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
