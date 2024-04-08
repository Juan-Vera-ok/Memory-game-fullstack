import {RequestHandler, Router} from 'express'
const router = Router();

import * as userController from './users.controllers';

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/userAuth', userController.auth);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);

export default router