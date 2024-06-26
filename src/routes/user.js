import express from 'express';
const router = express.Router();
import { userController } from '../controllers/index.js';

router.post('/register', userController.register);
router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.post('/login', userController.login);
router.post('/changepassword', userController.changePassword);
router.get('/:id', userController.getUserById);
router.put('/edit/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.get('/', userController.getAllUsers);


export default router;