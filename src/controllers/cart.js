import { cartService } from '../services/index.js'

const getAllCart = async (req, res) => {
    try {
        const carts = await cartService.getAllCart()
        return res.status(200).json({
            message: 'Get all Cart successfully',
            data: carts
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Cart failed"
        })
    }
}
const getCartById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.id)
        return res.status(200).json({
            message: 'Get Cart successfully',
            data: cart
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get Cart failed"
        })
    }
}
const updateCart = async (req, res) => {
    try {
        const cart = await cartService.updateCart(req.params.id, req.body)
        return res.status(200).json({
            message: 'Update Cart successfully',
            data: cart
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Update Cart failed"
        })
    }
}
const deleteProductCart = async (req, res) => {
    try {
        const cart = await cartService.deleteProductCart(req.params.id, req.body.id)
        return res.status(200).json({
            message: 'Delete Product Cart successfully',
            data: cart
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Delete Product Cart failed"
        })
    }
}

export default {
    getAllCart,
    getCartById,
    updateCart,
    deleteProductCart
}