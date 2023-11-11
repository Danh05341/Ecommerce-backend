import express from 'express';
const router = express.Router();
import {brandController} from '../controllers/index.js';

router.get('/', brandController.getAllBrand);

export default router;