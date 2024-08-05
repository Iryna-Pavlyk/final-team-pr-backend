// import express from 'express';
import { Router } from 'express';
import authRouter from './auth.js';
import waterRouter from './water.js';
import usersRouter from './users.js';
// import { PUBLIC_DIR } from '../constants/index.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/water', waterRouter);

export default router;
