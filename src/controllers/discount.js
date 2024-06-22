
import { discountService } from '../services/index.js'

const createDiscount = async (req, res) => {
    const { code, amount, startDate, endDate, maxUses } = req.body;
    try {
        const discount = await discountService.createDiscount({ code, amount, startDate, endDate, maxUses })
        return res.status(200).json({
            message: 'Create Discount successfully',
            data: discount
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Create Discount failed"
        })
    }
}

const getDiscount = async (req, res) => {
    try {
        const discount = await discountService.getDiscount(req.params.id)
        return res.status(200).json({
            message: 'Get Discount successfully',
            data: discount
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get Discount failed"
        })
    }
}

const getDiscountsList = async (req, res) => {
    try {
        const discounts = await discountService.getDiscountsList()
        return res.status(200).json({
            message: 'Get Discount List successfully',
            data: discounts
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get Discount List failed"
        })
    }
}

const updateDiscount = async (req, res) => {
    try {
        const updatedDiscount = await discountService.updateDiscount(req.params.id, req.body)
        return res.status(200).json({
            message: 'Update Discount successfully',
            data: updatedDiscount
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Update Discount failed"
        })
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const deletedDiscount = await discountService.deleteDiscount(req.params.id)
        return res.status(200).json({
            message: 'deleted Discount successfully',
            data: deletedDiscount
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "deleted Discount failed"
        })
    }
}
const applyDiscount = async (req, res) => {
    try {
        const { code } = req.body
        const discount = await discountService.applyDiscount(code)
        return res.status(200).json({
            message: 'apply Discount successfully',
            data: discount
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "apply Discount failed"
        })
    }
}

export default {
    createDiscount,
    getDiscount,
    getDiscountsList,
    updateDiscount,
    deleteDiscount,
    applyDiscount
}