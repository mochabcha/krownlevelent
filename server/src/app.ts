import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import path from 'node:path';
import { env } from './config/env.js';
import { errorHandler } from './utils/http.js';
import { authRoutes } from './routes/authRoutes.js';
import { publicRoutes } from './routes/publicRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';

const siteRoot = process.cwd();
const distDir = path.join(siteRoot, 'dist');

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      name: 'kle.sid',
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: env.MONGODB_URI ? MongoStore.create({ mongoUrl: env.MONGODB_URI }) : undefined,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8,
      },
    })
  );

  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api', publicRoutes);

  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });

  app.use(errorHandler);

  return app;
}
