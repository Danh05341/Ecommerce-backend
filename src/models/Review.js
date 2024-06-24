import mongoose, { Schema } from 'mongoose'

const ReviewSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        name: { type: String, required: true},
        image: { type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Review', ReviewSchema);
