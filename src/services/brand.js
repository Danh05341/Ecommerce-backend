import { Brand } from '../models/index.js';

const getAllBrand = async () => {
    const brand = await Brand.find({}).exec()
    return brand
}
const getBrandById = async (id) => {
    const brand = await Brand.findById(id).exec()
    return brand
}

export default {
    getAllBrand,
    getBrandById
}