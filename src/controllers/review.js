import { reviewService } from '../services/index.js'


const getReviewByProductId = async (req, res) => {
    try {
        const review = await reviewService.getReviewByProductId(req.params.productId)
        return res.status(200).json({
            message: 'Get all Review Product successfully',
            data: review
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Review Product failed"
        })
    }
}
const addReview = async (req, res) => {
    try {
        const {userId, productId, rating, comment} = req.body
        const review = await reviewService.addReview({userId, productId, rating, comment})
        return res.status(200).json({
            message: 'Add Review Product successfully',
            data: review
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Add Review Product failed"
        })
    }
}
const deleteReview = async (req, res) => {
    try {
        const review = await reviewService.deleteReview(req.body)
        return res.status(200).json({
            message: 'Delete Review Product successfully',
            data: review
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Delete Review Product failed"
        })
    }
}

export default {
    getReviewByProductId,
    addReview,
    deleteReview
}