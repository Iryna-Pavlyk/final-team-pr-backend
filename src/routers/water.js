import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  getWaterController,
  addWaterController,
  getWaterByIdController,
  deleteWaterController,
  patchWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';

const router = Router();

// router.use(authenticate);

// router.get('/', ctrlWrapper(getWaterController));

router.get('/', ctrlWrapper(getWaterController));

router.get('/:waterId', ctrlWrapper(getWaterByIdController));

router.post(
  '/',
  validateBody(createWaterSchema),
  ctrlWrapper(addWaterController),
);

router.patch(
  '/:waterId',
  validateBody(updateWaterSchema),
  ctrlWrapper(patchWaterController),
);

router.delete('/:waterId', ctrlWrapper(deleteWaterController));

export default router;
