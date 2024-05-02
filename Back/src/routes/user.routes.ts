import {RequestHandler, Router} from 'express'
import cors from 'cors'
const router = Router();
import * as userController from './users.controllers';

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/userAuth',userController.auth);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);
router.post('/update-highscore',cors({origin:"https://memory-game-client.onrender.com",
  credentials:true
}),userController.updateHighScore
 );
router.post('/highScore-current-user',userController.highScoreOfCurrentUser)

export default router