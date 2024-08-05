import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSigninSchema, userSignupSchema } from '../validation/user.js';
import { signinController, logoutController, refreshController, signupController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/signup', validateBody(userSignupSchema), ctrlWrapper(signupController));
authRouter.post('/signin', validateBody(userSigninSchema), ctrlWrapper(signinController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
