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
        const products = await productService.getProduct()
        return res.status(200).json({
            message: 'Get all product successfully',
            data: products
            
        })
    } catch (error) {
        return res.status(400).json({
            error: error.toString(),
            message: "Get all product failed"
        })
    }
}
const getProductBySlug = async (req, res) => {
    try {
        const query = req.query

        const slug = req.params.slug
        
        let result = []
        if (req.params.slug === 'all') {
            result = await productService.getAllProduct(query)
        }
        else {
            result = await productService.getProductBySlug(req.params.slug, query)
        }
        return res.status(200).json({
            message: 'Get product successfully',
            data: result.product,
            totalPage: result.totalPage,
            brandNames: result.brandNames,
        })
    } catch (error) {
        return res.status(400).json({
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
const deleteProducts = async (req, res) => {
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
    getProductBySlug,
    updateProduct,
    deleteProducts
}