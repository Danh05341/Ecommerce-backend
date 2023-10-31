import { bannerService } from '../services/index.js'

const getAllBanner = async (req, res) => {
    try {
        const banner = await bannerService.getAllBanner()
        return res.status(200).json({
            message: 'Get all Banner successfully',
            data: banner
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Banner failed"
        })
    }
}

export default {
    getAllBanner
}