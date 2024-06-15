import express from 'express';
const router = express.Router();
import {categoryController} from '../controllers/index.js';
import uploadCloud from '../middleware/uploads.js';

router.get('/', categoryController.getAllCategory);
router.post('/upload', uploadCloud.single('image'), categoryController.uploadImage);
router.get('/quantity', categoryController.quantityProduct);
router.get('/:slug', categoryController.getCategoryBySlug);
router.post('/create', categoryController.createCategory);
router.delete('/', categoryController.deleteManyCategory);


export default router;
