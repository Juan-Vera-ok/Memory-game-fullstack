import {Router} from 'express'
import * as userController from './users.controllers';
import checkAuth from '../middlewares/isAuth';

const router = Router();
router.use(checkAuth)
router.post('/user',userController.createUser);

router.get('/users',userController.getUsers);

router.post('/userAuth',userController.auth)

router.delete('/user/:id',userController.deleteUser);

router.put('/user/:id',userController.updateUser);




export default router