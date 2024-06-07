import mongoose, { Schema } from 'mongoose'

const Order = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingFee: {
            type: String,
            required: true,
        },
        discountCode: {
            type: String,
        },
        discountAmount: {
            type: String,
        },
        productsOrder: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: String, required: true },
                size: { type: String, required: true },
                brandId: { type: mongoose.Schema.Types.ObjectId, required: true },
                quantity: { type: Number, required: true },
            }
        ],
        status: {
            type: String,
            enum: ['pending', 'paid'],
            default: 'pending',
        },
        proccesingStatus: {
            type: String,
            enum: ['unconfirmed', 'delivering', 'finish', 'cancel'],
            default: 'unconfirmed',
        },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Order', Order)