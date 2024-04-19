import express from 'express';
const router = express.Router();
import { userController } from '../controllers/index.js';

router.post('/signup', userController.register);
router.post('/login', userController.login);
router.post('/refreshToken', userController.refreshToken);
// router.post('/refreshToken', userController.refreshToken);


export default router;