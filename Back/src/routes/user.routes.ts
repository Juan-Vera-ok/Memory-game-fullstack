import {Router} from 'express'
const router = Router();

import * as userController from './users.controllers';

router.post('/user',userController.createUser);

router.get('/users',userController.getUsers);

router.get('/user/:id',userController.getUser);


router.delete('/user/:id',userController.deleteUser);

router.put('/user/:id',userController.updateUser);



export default router