import express from 'express';
const router = express.Router();
import {categoryController} from '../controllers/index.js';

router.get('/', categoryController.getAllCategory);

export default router;