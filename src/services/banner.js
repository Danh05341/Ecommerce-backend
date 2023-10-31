import { Banner } from '../models/index.js';

const getAllBanner = async () => {
    const banner = await Banner.find({}).exec()
    return banner
}

export default {
    getAllBanner
}