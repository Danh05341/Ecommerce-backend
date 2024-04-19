import express from 'express';
const router = express.Router();
import {cartController} from '../controllers/index.js';

router.get('/', cartController.getAllCart);
router.get('/:id', cartController.getCartById);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteProductCart);

export default router;