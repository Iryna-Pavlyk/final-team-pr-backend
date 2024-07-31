import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import router from './routers/index.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(router);

  app.use(errorHandler);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
