import { Product } from '../models/index.js';


const addProduct = async ({name, category, image, price, description}) => {
    const newProduct = await Product.create({name, category, image, price, description})
    return {
        ...newProduct.toObject()
    }
}
const getAllProduct = async () => {
    const products = await Product.find({}).exec()
    return products
    
}
const getProductById = async (id) => {
    const product = await Product.findById(id).populate('brand_id').exec()
    return product
}
const updateProduct = async (id, update) => {
    const product = await Product.findByIdAndUpdate(id, update).exec()
    return product
}

export default {
    addProduct,
    getAllProduct,
    getProductById,
    updateProduct
}