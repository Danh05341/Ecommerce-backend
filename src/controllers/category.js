import { categoryService } from '../services/index.js'

const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory()
        return res.status(200).json({
            message: 'Get all Category successfully',
            data: categories
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Category failed"
        })
    }
}
const getCategoryBySlug = async (req, res) => {
    try {
        const category = await categoryService.getCategoryBySlug(req.params.slug)
        return res.status(200).json({
            message: 'Get Category Details successfully',
            data: category
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get Category Details failed"
        })
    }
}
const uploadImage = async (req, res) => {
    try {
        const fileData = req.file
        console.log(fileData)
        res.status(200).json(fileData)
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Upload failed"
        })
    }
}
const quantityProduct = async (req, res) => {
    try {
        const category = await categoryService.quantityProduct(req.query)
        return res.status(200).json({
            message: 'Get Category quantity product successfully',
            data: category
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get Category quantity product failed"
        })
    }
}

const createCategory = async (req, res) => {
    
    try {
        const category = await categoryService.createCategory(req.body)
        return res.status(200).json({
            message: 'Create category successfully',
            data: category
        })
    } catch (error) {
        return res.status(400).json({
            error: error.toString(),
            message: "Create category failed"
        })
    }
}

const deleteManyCategory = async (req, res) => {
    
    try {
        const category = await categoryService.deleteManyCategory(req.body)
        return res.status(200).json({
            message: 'Delete category successfully',
            data: category
        })
    } catch (error) {
        return res.status(400).json({
            error: error.toString(),
            message: "Delete category failed"
        })
    }
}

export default {
    getAllCategory,
    uploadImage,
    getCategoryBySlug,
    quantityProduct,
    createCategory,
    deleteManyCategory
}