import { Router } from 'express';
import authRouter from './auth.js';
import waterRouter from './water.js';
import usersRouter from './users.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/water', waterRouter);

export default router;
