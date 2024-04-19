import { productService } from '../services/index.js'

const addProduct = async (req, res) => {
    const { name, category, image, price, description } = req.body;

    try {
        const newProduct = await productService.addProduct({ name, category, image, price, description })
        return res.status(200).json({
            message: 'Add product successfully',
            data: newProduct
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Add product failed"
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await productService.getAllProduct()
        return res.status(200).json({
            message: 'Get all product successfully',
            data: products
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all product failed"
        })
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.slug)
        return res.status(200).json({
            message: 'Get product successfully',
            data: product
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get product failed"
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = req.body
        const product = await productService.updateProduct(req.params.id, updatedProduct)
        return res.status(200).json({
            message: 'Update product successfully',
            data: product
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Update product failed"
        })
    }
}


export default {
    addProduct,
    getAllProduct,
    getProductById,
    updateProduct
}