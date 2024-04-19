import { brandService } from '../services/index.js'

const getAllBrand = async (req, res) => {
    try {
        const brand = await brandService.getAllBrand()
        return res.status(200).json({
            message: 'Get all Brand successfully',
            data: brand
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Brand failed"
        })
    }
}
const getBrandById = async (req, res) => {
    try {
        const brand = await brandService.getBrandById(req.params.id)
        return res.status(200).json({
            message: 'Get  Brand successfully',
            data: brand
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get  Brand failed"
        })
    }
}

export default {
    getAllBrand,
    getBrandById
}