import express from 'express';
const router = express.Router();
import {productController} from '../controllers/index.js';

router.get('/', productController.getAllProduct);
router.post('/', productController.addProduct);

export default router;