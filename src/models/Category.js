import mongoose, {Schema} from 'mongoose'

const Category = new Schema(
    {
        name: { type: String, required: true },
        description: {type: String},
        parent: {type: String, default: null},
        slug: {type: String, required: true }
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Category', Category)