import express from 'express';
const router = express.Router();
import { orderController } from '../controllers/index.js';

router.get('/', orderController.getAllOrder);
// router.get('/', orderController.getAllOrder);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.get('/user/:id', orderController.getOrdersUserById);
router.get('/details/:id', orderController.getOrderDetailsById);
router.post('/revenue-summary', orderController.getRevenueSummary);
router.get('/finish/:id', orderController.getOrderIdsUser);


export default router;