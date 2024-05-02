import {RequestHandler, Router} from 'express'
import cors from 'cors'
const router = Router();

import * as userController from './users.controllers';
router.use(cors({origin:["https://memory-game-client.onrender.com ",
  "https://memory-game-client.onrender.com"
],credentials:true}));
router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/userAuth', userController.auth);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);
router.post('/update-highscore', userController.updateHighScore);
router.post('/highScore-current-user',userController.highScoreOfCurrentUser)

export default router