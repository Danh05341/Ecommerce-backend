import express from 'express';
const router = express.Router();
import {sliderController} from '../controllers/index.js';

router.get('/', sliderController.getAllSlider);

export default router;