import { Brand, Category, Product } from '../models/index.js';
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
    // brands trả về [] nếu query {}
    // chuỗi rỗng để split không bị lỗi
    // const brands = [...(query.brands || '').split(',')]
    const brands = query.brands ? [...query.brands.split(',')] : []
    const price = query.price || ""
    const size = query.size || ""
    const limit = 12
    const skip = (page - 1) * limit

    const brandIds = await Brand.find({ name: { $in: brands } }).distinct('_id').exec()
    let product = []
    let totalProduct = 0
    // TH1: brands trả về []
    if (brands.length > 0) {
        console.log('TH1: ', brands)

        product = await Product.find({ brand_id: { $in: brandIds } }).populate({
            path: 'brand_id',
            // match: { name: { $in: brands } },
            // select: 'name -_id'
        }).skip(skip).limit(limit).exec()
        totalProduct = await Product.countDocuments({ brand_id: { $in: brandIds } }).exec()

    } else {
        // TH2: brands trả về [] brand_id
        console.log('TH2: ', brands)

        product = await Product.find({}).populate({
            path: 'brand_id',
            // match: { name: { $in: brands } },
            // select: 'name -_id'
        }).skip(skip).limit(limit).exec()
        totalProduct = await Product.countDocuments({}).exec()
    }

    console.log('count: ', totalProduct)
    const totalPage = Math.ceil(totalProduct / 12)
    // const brandName =  [... new Set(product.map(data => data.brand_id))]
    return {
        product,
        totalPage,
        // brandName
    }
}

const getProductBySlug = async (slug, query) => {
    // const { page, search, sort, brand, price, size } = query
    // console.log(page, search, sort, brand, price, size)
    let product = []
    let totalProduct = 0

    product = await Product.findOne({ slug: slug }).populate('brand_id').exec()
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
    const brands = query.brands ? [...query.brands.split(',')] : []
    const price = query.price || ""
    const size = query.size || ""

    const limit = 12
    const skip = (page - 1) * limit

    // TH1: brands trả về []
    if (brands.length > 0) {
        console.log('TH1: ', brands)
        const brandIds = await Brand.find({ name: { $in: brands } }).distinct('_id').exec()
        product = await Product.find({ category: categoryNames, brand_id: { $in: brandIds } }).skip(skip).limit(limit).populate('brand_id').exec()
        totalProduct = await Product.countDocuments({ category: categoryNames, brand_id: { $in: brandIds } }).exec()
        

    } else {
        // TH2: brands trả về [] brand_id
        console.log('TH2: ', brands)
        product = await Product.find({ category: categoryNames }).skip(skip).limit(limit).populate('brand_id').exec()
        totalProduct = await Product.countDocuments({ category: categoryNames }).exec()
    }

    console.log('count: ', totalProduct)

    // product = await Product.find({ category: categoryNames }).skip(skip).limit(limit).populate('brand_id').exec()
    // const totalProduct = await Product.countDocuments({ category: categoryNames }).exec()
    const totalPage = Math.ceil(totalProduct / 12)
    // const brandName = [...new Set(product.map(item => item.brand_id))];


    return {
        product,
        totalPage,
        // brandName
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