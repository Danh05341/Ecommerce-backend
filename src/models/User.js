import mongoose, {Schema} from 'mongoose'
import Product from './Product';

const User = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        image: { type: String },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('User', User)