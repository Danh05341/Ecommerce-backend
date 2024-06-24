import express from 'express';
const router = express.Router();
import { reviewController } from '../controllers/index.js';

router.get('/:productId', reviewController.getReviewByProductId);
router.post('/', reviewController.addReview);
router.delete('/', reviewController.deleteReview);

export default router;
