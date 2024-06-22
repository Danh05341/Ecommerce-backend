
import { Discount } from '../models/index.js';
import { dateConverterPlus7 } from '../utils/date.js';
const createDiscount = async ({ code, amount, startDate, endDate, maxUses }) => {
    const discount = await Discount.find({ code }).exec()
    console.log('discount', discount)
    if (discount.length > 0) throw new Error('Mã giảm giá đã tồn tại')
    const newEndDate = new Date(endDate).setHours(23, 59, 59, 999)
    const newDiscount = new Discount({ code, amount, startDate, endDate: newEndDate, maxUses });
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
    console.log('updateData.maxUses: ', updateData.maxUses)
    console.log('discount.timesUsed: ', discount.timesUsed)
    if (updateData.maxUses <= discount.timesUsed) {
        newDiscount.isActive = false;
    } else {
        newDiscount.isActive = true;
    }
    const discountUpdated = await Discount.findByIdAndUpdate(id, newDiscount, { new: true }).exec()
    return discountUpdated
}

const deleteDiscount = async (id) => {
    const discountDeleted = await Discount.findByIdAndDelete(id).exec();
    return discountDeleted
}

const applyDiscount = async (code) => {
    const discount = await Discount.findOne({ code }).exec();
    if (!discount) throw new Error('Discount not found')

    const now = dateConverterPlus7(new Date())

    // Kiểm tra xem mã giảm giá còn hoạt động không
    if (!discount.isActive || now < discount.startDate || now > discount.endDate) {
        throw new Error('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }

    // Kiểm tra số lần sử dụng
    if (discount.timesUsed >= discount.maxUses) {
        throw new Error('Mã giảm giá đã đạt giới hạn sử dụng');
    }

    return discount
}

export default {
    createDiscount,
    getDiscount,
    getDiscountsList,
    updateDiscount,
    deleteDiscount,
    applyDiscount
}