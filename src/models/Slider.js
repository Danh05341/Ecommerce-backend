import mongoose, {Schema} from 'mongoose'

const Slider = new Schema(
    {
        image_url: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Slider', Slider)