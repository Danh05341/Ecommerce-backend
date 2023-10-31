import express from 'express';
const router = express.Router();
import {categoryController} from '../controllers/index.js';
import uploadCloud from '../middleware/uploads.js';

router.get('/', categoryController.getAllCategory);
router.post('/upload', uploadCloud.single('image'), categoryController.uploadImage);

export default router;