import express from 'express';
const router = express.Router();
import { provinceController } from '../controllers/index.js';

router.get('/', provinceController.getAllProvince);

export default router;
