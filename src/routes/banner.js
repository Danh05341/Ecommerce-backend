import express from 'express';
const router = express.Router();
import {bannerController} from '../controllers/index.js';

router.get('/', bannerController.getAllBanner);

export default router;