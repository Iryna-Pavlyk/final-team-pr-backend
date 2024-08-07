import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userInfoSchema } from '../validation/user.js';
import authenticate from '../middlewares/authenticate.js';
import { getAllUsersController, getUserSettingsController, patchUserSettingsController } from '../controllers/user.js';
// import { upload } from '../middlewares/upload.js';

const usersRouter = Router();

usersRouter.get('/', ctrlWrapper(getAllUsersController));

usersRouter.use(authenticate);

usersRouter.get('/current', ctrlWrapper(getUserSettingsController));
usersRouter.patch('/current', validateBody(userInfoSchema), ctrlWrapper(patchUserSettingsController));

export default usersRouter;
