import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userInfoSchema } from '../validation/user-schemas.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { getAllUsersController, getUserSettingsController, patchUserSettingsController } from '../controllers/user-controllers.js';
import { upload } from '../middlewares/upload.js';

const usersRouter = Router();

usersRouter.get('/', ctrlWrapper(getAllUsersController));

usersRouter.use(authenticate);

usersRouter.get('/:userId', isValidId, ctrlWrapper(getUserSettingsController));
usersRouter.patch('/:userId', isValidId, upload.single('avatar'), validateBody(userInfoSchema), ctrlWrapper(patchUserSettingsController));

export default usersRouter;
