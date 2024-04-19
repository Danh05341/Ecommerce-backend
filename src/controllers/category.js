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

export default {
    getAllCategory,
    uploadImage,
    getCategoryBySlug
}