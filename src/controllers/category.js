import { categoryService } from '../services/index.js'

const getAllCategory = async (req, res) => {
    try {
        const categorys = await categoryService.getAllCategory()
        return res.status(200).json({
            message: 'Get all Category successfully bi ngu roi à',
            data: categorys
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Category failed"
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
    uploadImage
}