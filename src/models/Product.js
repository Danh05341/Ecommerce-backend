import mongoose, { Schema } from 'mongoose'

const Product = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        image: [
            { type: String, required: true },
        ],
        price: { type: String, required: true },
        sale_price: { type: String, default: null },
        description: { type: String },
        total: { type: Number, required: true },
        status: { type: Boolean, required: true },
        size: [
            {
                _id: false,
                size: { type: String, required: true },
                quantity: { type: String, required: true },
                price: { type: String, default: null }
            }
        ],
        brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
        slug: { type: String, required: true }
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Product', Product)