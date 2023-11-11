import mongoose, {Schema} from 'mongoose'

const Brand = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Brand', Brand)