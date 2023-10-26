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

export default {
    addProduct,
    getAllProduct
}