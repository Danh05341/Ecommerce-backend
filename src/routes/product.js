import express from 'express';
const router = express.Router();
import {productController} from '../controllers/index.js';

router.get('/', productController.getAllProduct);
router.get('/:slug', productController.getProductBySlug); //
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);

export default router;