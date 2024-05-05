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

    const page = query.page || 1
    const search = query.search || ""
    const sort = query.sort || 'desc'
    const brand = query.brand || ""
    const price = query.price || ""
    const size = query.size || ""

    const limit = 12
    const skip = ( page - 1 ) * limit
    const product = await Product.find({}).skip(skip).limit(limit).populate('brand_id').exec()
    const totalProduct = await Product.countDocuments({}).exec()
    const totalPage = Math.ceil(totalProduct / 12)
    
    return {
        product,
        totalPage
    }
    return products

}

const getProductBySlug = async (slug, query) => {
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

    const page = query.page || 1
    const search = query.search || ""
    const sort = query.sort || 'desc'
    const brand = query.brand || ""
    const price = query.price || ""
    const size = query.size || ""

    const limit = 12
    const skip = ( page - 1 ) * limit


    product = await Product.find({ category: categoryNames }).skip(skip).limit(limit).populate('brand_id').exec()
    const totalProduct = await Product.countDocuments({ category: categoryNames }).exec()
    const totalPage = Math.ceil(totalProduct / 12)
    
    return {
        product,
        totalPage
    }
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