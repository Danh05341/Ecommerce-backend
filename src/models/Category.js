import mongoose, {Schema} from 'mongoose'

const Category = new Schema(
    {
        name: { type: String, required: true },
        description: {type: String},
        parent: {type: String, default: null},
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Category', Category)