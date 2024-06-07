import express from 'express';
const router = express.Router();
import { paymentController } from '../controllers/index.js';

router.post('/create_payment_url', paymentController.createUrlPayment);
router.get('/payment_return', paymentController.paymentReturn);

export default router;
