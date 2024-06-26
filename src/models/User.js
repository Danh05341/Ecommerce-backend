import mongoose, { Schema } from 'mongoose'
// import Cart from './Cart'

const User = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        image: { type: String },
        cart_id: { type: Schema.Types.ObjectId, ref: "Cart", default: () => null },
        role: { type: String, default: "user" },
        addresses: [
            {
                fullName: { type: String },
                phone: { type: String },
                address: { type: String },
                isDefault: { type: Boolean, default: false },
                city: { type: String},
                district: { type: String},
                ward: { type: String}
            }
        ],
        phone: { type: String }
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('User', User)