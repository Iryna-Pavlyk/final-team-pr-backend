import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { PUBLIC_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(
    cors({
      origin: env('CORS_APPROVED_DOMAINS')?.split(', ') ?? [],
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use('/public', express.static(PUBLIC_DIR));

  app.use(cookieParser());

  app.use(router);

  app.use('/api-docs', swaggerDocs());

  app.use(errorHandler);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
