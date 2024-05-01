import { Category, Product } from '../models/index.js';
import { getCategoriesWithChildren, getAllCategoryNames } from '../utils/category.js';

const addProduct = async ({ name, category, image, price, description }) => {
    const newProduct = await Product.create({ name, category, image, price, description })
    return {
        ...newProduct.toObject()
    }
}
const getAllProduct = async (query) => {
    // const { page, search, sort, brand, price, size } = query
    // const skip = ( page - 1 ) * 10
    const limit = 10
    // const products = await Product.find({}).skip(skip).limit(limit).exec()
    const products = await Product.find({}).exec()
    return products

}

const getProductBySlug = async (slug) => {
    // const { page, search, sort, brand, price, size } = query
    // console.log(page, search, sort, brand, price, size)
    
    let product = await Product.findOne({ slug: slug }).populate('brand_id').exec()
    // Nếu không tìm thấy product = null
    if (product) return product

    const categoryParent = await Category.findOne({ slug: slug }).distinct('name').exec()
    const categoryWithChildren = await getCategoriesWithChildren(categoryParent)
    const categoryChildren = getAllCategoryNames(categoryWithChildren)

    // Mảng tên danh mục
    const categoryNames = categoryParent.concat(categoryChildren)
    // console.log(categoryNames)
    product = await Product.find({ category: categoryNames }).populate('brand_id').exec()
    return product
}

const updateProduct = async (id, update) => {
    const product = await Product.findByIdAndUpdate(id, update).exec()
    return product
}

export default {
    addProduct,
    getAllProduct,
    getProductBySlug,
    updateProduct
}