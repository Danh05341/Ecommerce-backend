
import { Discount } from '../models/index.js';

const createDiscount = async ({ code, amount }) => {

    const newDiscount = new Discount({ code, amount });
    await newDiscount.save();
    return newDiscount
}

const getDiscount = async (id) => {

    const discount = Discount.findById(id).exec()
    return discount
}

const getDiscountsList = async () => {

    const discounts = Discount.find({}).exec()
    return discounts
}

const updateDiscount = async (id, updateData) => {
    const discount = await Discount.findById(id).exec();
    if (!discount) {
       throw new Error('Discount not found');
    }
    const newDiscount = { ...discount._doc, ...updateData }

    const discountUpdated = await Discount.findByIdAndUpdate(id, newDiscount, { new: true }).exec()
    return discountUpdated
}

const deleteDiscount = async (id) => {
    const discountDeleted = await Discount.findByIdAndDelete(id).exec();
    return discountDeleted
}

export default {
    createDiscount,
    getDiscount,
    getDiscountsList,
    updateDiscount,
    deleteDiscount
}