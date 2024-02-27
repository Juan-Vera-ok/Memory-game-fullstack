import {Router} from 'express'
const router = Router();

import * as userController from './users.controllers';

router.get('/users',userController.getUsers);

router.get('/users/:id',userController.getUser);

router.post('/users',userController.createUser);

router.delete('/users/:id',userController.deleteUser);

router.put('/users/:id',userController.updateUser);



export default router