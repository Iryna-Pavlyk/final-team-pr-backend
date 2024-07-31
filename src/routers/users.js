import { Router } from 'express';

const router = Router();

// router.use(authenticate);

// router.get('/', ctrlWrapper(getUsersController));

router.get('/');

router.get('/:usersId');

router.post('/');

router.patch('/:usersId');

router.delete('/:usersId');

export default router;
