import { sliderService } from '../services/index.js'

const getAllSlider = async (req, res) => {
    try {
        const slider = await sliderService.getAllSlider()
        return res.status(200).json({
            message: 'Get all Slider successfully',
            data: slider
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Slider failed"
        })
    }
}

export default {
    getAllSlider
}