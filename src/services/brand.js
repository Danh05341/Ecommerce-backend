import { Brand } from '../models/index.js';

const getAllBrand = async () => {
    const brand = await Brand.find({}).exec()
    return brand
}

export default {
    getAllBrand
}