import mongoose, {Schema} from 'mongoose'

const Product = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Product', Product)