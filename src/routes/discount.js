import express from 'express';
const router = express.Router();
import { discountController } from '../controllers/index.js';

router.post('/create', discountController.createDiscount);
router.get('/', discountController.getDiscountsList);
router.get('/:id', discountController.getDiscount);
router.put('/edit/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);

export default router;
