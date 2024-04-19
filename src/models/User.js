import mongoose, {Schema} from 'mongoose'
// import Cart from './Cart'

const User = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        image: { type: String },
        cart_id: {type: Schema.Types.ObjectId, ref: "Cart", default: () => null},
        role: { type: String, default: "user"}
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('User', User)