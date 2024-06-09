
import { orderService } from '../services/index.js'

const getAllOrder = async (req, res) => {
    try {
        const result = await orderService.getAllOrder(req.query)
        return res.status(200).json({
            message: 'get ALL Order successfully',
            data: result.orders,
            totalPage: result.totalPage
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "get ALL Order failed"
        })
    }
}

const createOrder = async (req, res) => {
    const {email, name, phone, address, city, district, ward, shippingFee, discountCode, discount, paymentMethod, productsOrder, totalPrice, userId } = req.body;
    console.log('req.body:', req.body)
    try {
        const newProduct = await orderService.createOrder({email, name, phone, address, city, district, ward, shippingFee, discountCode, discount, totalPrice ,paymentMethod, productsOrder, userId})
        return res.status(200).json({
            message: 'create Order successfully',
            data: newProduct
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "create Order failed"
        })
    }
}

const getOrdersUserById = async (req, res) => {
    try {
        const result = await orderService.getOrdersUserById(req.params.id, req.query)
        return res.status(200).json({
            message: 'get Order successfully',
            data: result.order,
            totalPage: result.totalPage,
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "get Order failed"
        })
    }
}
const getOrderDetailsById = async (req, res) => {
    try {
        const order = await orderService.getOrderDetailsById(req.params.id)
        return res.status(200).json({
            message: 'get Order Details successfully',
            data: order
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "get Order Details failed"
        })
    }
}
const updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body)
        return res.status(200).json({
            message: 'update Order successfully',
            data: order
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "update Order failed"
        })
    }
}
const getRevenueSummary = async (req, res) => {
    try {
        const revenueSummary = await orderService.getRevenueSummary(req.body)
        return res.status(200).json({
            message: 'getRevenueSummary successfully',
            data: revenueSummary
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "getRevenueSummary failed"
        })
    }
}

export default {
    getAllOrder,
    createOrder,
    getOrdersUserById,
    getOrderDetailsById,
    updateOrder,
    getRevenueSummary
}