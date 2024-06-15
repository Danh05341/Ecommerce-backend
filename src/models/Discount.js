import mongoose, { Schema } from 'mongoose'

const Discount = new Schema(
    {
        code: { type: String, required: true },
        description: { type: String },
        amount: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Discount', Discount)
