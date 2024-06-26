import mongoose, {Schema} from 'mongoose'

const Cart = new Schema(
    {
        items: [
            {

                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", _id: false }, // Tham chiếu đến sản phẩm
                quantity: { type: Number},
                imageCurrent: {type: Number, required: true },
                productSize: {type: String, required: true}
            },
        ], // Mảng các sản phẩm trong giỏ hàng
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Cart', Cart)