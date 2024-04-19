import express from 'express';
const router = express.Router();
import {productController} from '../controllers/index.js';

router.get('/', productController.getAllProduct);
router.get('/:slug', productController.getProductById);
// router.get('/:slug', (req,res ) => {res.json(req.params.slug)});
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);

export default router;