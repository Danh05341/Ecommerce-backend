import mongoose, { Schema } from 'mongoose'

const Discount = new Schema(
    {
        code: { type: String, required: true, unique: true },
        description: { type: String },
        amount: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        maxUses: { type: Number, required: true }, //Giới hạn số lần sử dụng của mã giảm giá, yêu cầu phải có.
        timesUsed: { type: Number, default: 0 } // Số lần mã giảm giá đã được sử dụng, mặc định là 0.
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Discount', Discount)
