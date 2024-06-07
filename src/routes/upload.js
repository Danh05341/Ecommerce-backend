import express from 'express';
const router = express.Router();
import { uploadController } from '../controllers/index.js';
import uploadCloud from '../middleware/uploads.js';

router.post('/', uploadCloud.single('image'), uploadController.uploadImage);


export default router;