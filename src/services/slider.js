import { Slider } from '../models/index.js';

const getAllSlider = async () => {
    const sliders = await Slider.find({}).exec()
    return sliders
}

export default {
    getAllSlider
}