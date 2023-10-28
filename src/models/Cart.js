import mongoose, {Schema} from 'mongoose'

const Cart = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến người dùng
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu đến sản phẩm
                quantity: { type: Number, default: 1 },
            },
        ], // Mảng các sản phẩm trong giỏ hàng
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Cart', Cart)