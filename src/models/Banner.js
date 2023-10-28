import mongoose, {Schema} from 'mongoose'

const Banner = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Banner', Banner)