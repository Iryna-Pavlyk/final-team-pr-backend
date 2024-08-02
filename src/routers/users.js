import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userInfoSchema } from '../validation/user-schemas.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { getUserSettingsController, patchUserSettingsController } from '../controllers/user-controllers.js';

const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/:userId', isValidId, ctrlWrapper(getUserSettingsController));
usersRouter.patch('/:userId', isValidId, validateBody(userInfoSchema), ctrlWrapper(patchUserSettingsController));

export default usersRouter;
