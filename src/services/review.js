import { Review,User } from '../models/index.js';

const getReviewByProductId = async (productId) => {
    const reviews = Review.find({ productId}).exec()
    return reviews
}
const addReview = async ({userId, productId, rating, comment}) => {
    const user = await User.findOne({_id: userId}).exec()
    const review = Review.create({userId, productId, rating, comment, name: user.firstName + ' ' + user.lastName, image: user.image})
    return review
}
const deleteReview = async (productId) => {
    const review = Review.find({ productId}).exec()
    return review
}
export default {
    getReviewByProductId,
    addReview,
    deleteReview

}