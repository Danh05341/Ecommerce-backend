import mongoose, {Schema} from 'mongoose'

const Payment = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến người dùng
        cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true }, // Tham chiếu đến giỏ hàng
        amount: { type: Number, required: true },
        status: { type: String, required: true },
        paymentMethod: { type: String, required: true }, // Ví dụ: credit card, PayPal, v.v.
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Payment', Payment)