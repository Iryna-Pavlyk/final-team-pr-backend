import { Router } from 'express';
import {
  addWaterController,
  deleteWaterController,
  getDayWaterController,
  getMonthWaterController,
  patchWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createWaterSchema,
  getDayWaterSchema,
  getMonthWaterSchema,
  updateWaterSchema,
} from '../validation/water.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import validateQuery from '../middlewares/validateQuery.js';

const router = Router();

router.use(authenticate);

router.get('/day', validateQuery(getDayWaterSchema), ctrlWrapper(getDayWaterController))

router.get('/month', validateQuery(getMonthWaterSchema), ctrlWrapper(getMonthWaterController))


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
