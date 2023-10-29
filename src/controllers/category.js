import { categoryService } from '../services/index.js'

const getAllCategory = async (req, res) => {
    try {
        const categorys = await categoryService.getAllCategory()
        return res.status(200).json({
            message: 'Get all Category successfully',
            data: categorys
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Category failed"
        })
    }
}

export default {
    getAllCategory
}