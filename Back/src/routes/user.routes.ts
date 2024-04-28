import {RequestHandler, Router} from 'express'
const router = Router();

import * as userController from './users.controllers';

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/userAuth', userController.auth);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);
router.post('/update-highscore', (req, res,next) => {
    // Lógica para manejar la solicitud
    // Por ejemplo, puedes llamar a la función del controlador
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    userController.updateHighScore(req, res,next);
  
    // Agregar el encabezado Access-Control-Allow-Headers en la respuesta
  });
router.post('/highScore-current-user',userController.highScoreOfCurrentUser)

export default router