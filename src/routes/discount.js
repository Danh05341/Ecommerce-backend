import express from 'express';
const router = express.Router();
import { discountController } from '../controllers/index.js';

router.post('/create', discountController.createDiscount);
router.post('/apply', discountController.applyDiscount);
router.get('/', discountController.getDiscountsList);
router.get('/:id', discountController.getDiscount);
router.put('/edit/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);

export default router;
