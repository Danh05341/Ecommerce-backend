import { Brand, Category, Product } from '../models/index.js';
import { getCategoriesWithChildren, getAllCategoryNames } from '../utils/category.js';
import brand from './brand.js';

const addProduct = async ({ name, description, category, image, price, size, brand_id, slug, status, total }) => {
    const newProduct = await Product.create({ name, description, category, image, price, size, brand_id, slug, status, total })
    return {
        ...newProduct.toObject()
    }
}

const getProduct = async () => {
    return await Product.find({}).limit(15)
}

const getAllProduct = async (query) => {
    // const { page, search, sort, brand, price, size } = query

    const page = query.page || 1
    const sort = query.sort || 'descending'
    const search = query.search || ""
    // brands trả về [] nếu query {}
    // chuỗi rỗng để split không bị lỗi
    // const brands = [...(query.brands || '').split(',')]
    const brands = query.brands ? [...query.brands.split(',')] : []
    const minPrice = parseInt(query.minPrice) || 0
    const maxPrice = parseInt(query.maxPrice) || 999999999999
    const sizes = query.size ? query.size.split(',') : []
    const limit = 12
    const skip = (page - 1) * limit
    console.log('search1: ', search)
    const brandIds = await Brand.find({ name: { $in: brands } }).distinct('_id').exec()
    let product = []
    let totalProduct = 0
    let brandNames = []
    // // TH1: brands trả về []
    // if (brands.length > 0) {
    //     console.log('TH1: ', brands)

    //     product = await Product.find({ brand_id: { $in: brandIds } }).sort({price: sort}).collation({locale: "en_US", numericOrdering: true}).populate({
    //         path: 'brand_id',
    //         // match: { name: { $in: brands } },
    //         // select: 'name -_id'
    //     }).skip(skip).limit(limit).exec()
    //     totalProduct = await Product.countDocuments({ brand_id: { $in: brandIds } }).exec()

    // } else {
    //     // TH2: brands trả về [] brand_id
    //     console.log('TH2: ', brands)

    //     product = await Product.find({}).populate({
    //         path: 'brand_id',
    //         // match: { name: { $in: brands } },
    //         // select: 'name -_id'
    //     }).skip(skip).limit(limit).sort({price: sort}).collation({locale: "en_US", numericOrdering: true}).exec()
    //     totalProduct = await Product.countDocuments({}).exec()
    // }

    // console.log('count: ', totalProduct)
    // const totalPage = Math.ceil(totalProduct / 12)

    // brandNames = await Brand.find({}).exec()
    const sortDirection = sort === 'ascending' ? 1 : -1;

    // const matchConditions = brands.length > 0 ?
    //     {
    //         brand_id: { $in: brandIds },
    //         ...(sizes.length > 0 && { 'size.size': { $in: sizes }, }),
    //         ...(search && { size: { $regex: search } })
    //     } :
    //     {
    //         ...(sizes.length > 0 && { 'size.size': { $in: sizes } }),
    //         ...(search && { size: { $regex: search } })
    //     };
    const matchConditions =
    {
        ...(brands.length > 0 && { brand_id: { $in: brandIds } }),
        ...(sizes.length > 0 && { 'size.size': { $in: sizes }, }),
        ...(search && { name: { $regex: search, $options: 'i' } })
    }


    const aggregationPipeline = [
        { $match: matchConditions },
        {
            $addFields: {
                priceInt: {
                    $toInt: {
                        $replaceAll: {
                            input: { $replaceAll: { input: "$price", find: ".", replacement: "" } },
                            find: ",",
                            replacement: ""
                        }
                        // Trong aggregationPipeline, chúng ta sử dụng $replaceAll để loại bỏ cả dấu chấm và dấu phẩy trước khi chuyển đổi giá trị chuỗi thành số nguyên. 
                        // Điều này sẽ đảm bảo rằng chuỗi có định dạng như 1.200.000 và 550,000 sẽ được chuyển đổi đúng cách thành số nguyên để sắp xếp.
                    }
                }
            }
        },
        { $match: { priceInt: { $gte: minPrice, $lte: maxPrice } } },  // Thêm điều kiện lọc giá sau khi chuyển đổi priceInt
        { $sort: { priceInt: sortDirection } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: 'brands',
                localField: 'brand_id',
                foreignField: '_id',
                as: 'brand_id'
            }
        },
        { $unwind: "$brand_id" }
    ];

    const totalProductsPipeline = [
        { $match: matchConditions },
        {
            $addFields: {
                priceInt: {
                    $toInt: {
                        $replaceAll: {
                            input: { $replaceAll: { input: "$price", find: ".", replacement: "" } },
                            find: ",",
                            replacement: ""
                        }
                    }
                }
            }
        },
        { $match: { priceInt: { $gte: minPrice, $lte: maxPrice } } },  // Thêm điều kiện lọc giá sau khi chuyển đổi priceInt
        { $count: "total" }
    ];

    product = await Product.aggregate(aggregationPipeline).exec();
    const totalProductsResult = await Product.aggregate(totalProductsPipeline).exec();
    totalProduct = totalProductsResult.length > 0 ? totalProductsResult[0].total : 0;

    const totalPage = Math.ceil(totalProduct / limit);
    brandNames = await Brand.find({}).exec();
    const sizeList = await Product.find({}).distinct('size.size').exec()
    return {
        product,
        totalPage,
        brandNames,
        sizeList
    }
}

const getProductBySlug = async (slug, query) => {

    // let product = []
    // let totalProduct = 0
    // let brandNames = []

    // product = await Product.findOne({ slug: slug }).populate('brand_id').exec()

    // // Nếu không tìm thấy product = null
    // if (product) return {
    //     product
    // }
    // console.log('product2:')

    // const categoryParent = await Category.findOne({ slug: slug }).distinct('name').exec()
    // const categoryWithChildren = await getCategoriesWithChildren(categoryParent)
    // const categoryChildren = getAllCategoryNames(categoryWithChildren)

    // // Mảng tên danh mục
    // const categoryNames = categoryParent.concat(categoryChildren)
    // // console.log(categoryNames)

    // const page = query.page || 1
    // const search = query.search || ""
    // const sort = query.sort || 'descending'
    // const brands = query.brands ? [...query.brands.split(',')] : []
    // const price = query.price || ""
    // const size = query.size || ""

    // const limit = 12
    // const skip = (page - 1) * limit

    // // TH1: brands trả về []
    // if (brands.length > 0) {
    //     console.log('TH1: ', brands)
    //     // mảng brand Id của checkbox
    //     const brandIds = await Brand.find({ name: { $in: brands } }).distinct('_id').exec()
    //     product = await Product.find({ category: categoryNames, brand_id: { $in: brandIds } }).skip(skip).limit(limit).populate('brand_id').sort({ price: sort }).collation({ locale: "en_US", numericOrdering: true }).exec()
    //     totalProduct = await Product.countDocuments({ category: categoryNames, brand_id: { $in: brandIds } }).exec()

    // } else {
    //     // TH2: brands trả về [] brand_id
    //     console.log('TH2: ', brands)
    //     product = await Product.find({ category: categoryNames }).skip(skip).limit(limit).sort({ price: sort }).collation({ locale: "en_US", numericOrdering: true }).populate('brand_id').exec()
    //     totalProduct = await Product.countDocuments({ category: categoryNames }).exec()
    // }

    // console.log('count: ', totalProduct)

    // // product = await Product.find({ category: categoryNames }).skip(skip).limit(limit).populate('brand_id').exec()
    // // const totalProduct = await Product.countDocuments({ category: categoryNames }).exec()
    // const totalPage = Math.ceil(totalProduct / 12)

    // // mảng brand Id của mỗi danh mục
    // const brandIds = await Product.find({ category: categoryNames }).distinct('brand_id').exec()
    // if (brandIds) {
    //     brandNames = await Brand.find({ _id: brandIds }).exec()
    // }
    // Tìm sản phẩm theo slug
    let product = await Product.findOne({ slug: slug }).populate('brand_id').exec();

    if (product) return { product };

    // Lấy thông tin danh mục
    const categoryParent = await Category.findOne({ slug: slug }).distinct('name').exec();
    const categoryWithChildren = await getCategoriesWithChildren(categoryParent);
    const categoryChildren = getAllCategoryNames(categoryWithChildren);
    const categoryNames = categoryParent.concat(categoryChildren);

    // Thiết lập các tham số truy vấn
    const page = query.page || 1;
    const minPrice = parseInt(query.minPrice) || 0
    const maxPrice = parseInt(query.maxPrice) || 999999999999
    const sort = query.sort || 'descending';
    const sizes = query.size ? query.size.split(',') : []
    const search = query.search || ""
    console.log('search1: ', search)

    const brands = query.brands ? [...query.brands.split(',')] : [];
    const limit = 12;
    const skip = (page - 1) * limit;
    const sortDirection = sort === 'ascending' ? 1 : -1;

    // Điều kiện lọc sản phẩm
    const matchConditions = brands.length > 0
        ? {
            category: { $in: categoryNames },
            brand_id: { $in: await Brand.find({ name: { $in: brands } }).distinct('_id').exec() },
            ...(sizes.length > 0 && { 'size.size': { $in: sizes } }),
            ...(search && { name: { $regex: search, $options: 'i' } })
        }
        : {
            category: { $in: categoryNames },
            ...(sizes.length > 0 && { 'size.size': { $in: sizes } }),
            ...(search && { name: { $regex: search, $options: 'i' } })
        };

    // Pipeline để lấy sản phẩm và sắp xếp theo giá
    const aggregationPipeline = [
        { $match: matchConditions },
        {
            $addFields: {
                priceInt: {
                    $convert: {
                        input: { $replaceAll: { input: "$price", find: ".", replacement: "" } },
                        to: "int",
                        onError: 0
                    }
                }
            }
        },
        { $match: { priceInt: { $gte: minPrice, $lte: maxPrice } } },  // Thêm điều kiện lọc giá sau khi chuyển đổi priceInt
        { $sort: { priceInt: sortDirection } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: 'brands',
                localField: 'brand_id',
                foreignField: '_id',
                as: 'brand_id'
            }
        },
        { $unwind: "$brand_id" }
    ];

    // Pipeline để đếm tổng số sản phẩm
    const totalProductsPipeline = [
        { $match: matchConditions },
        {
            $addFields: {
                priceInt: {
                    $toInt: {
                        $replaceAll: {
                            input: { $replaceAll: { input: "$price", find: ".", replacement: "" } },
                            find: ",",
                            replacement: ""
                        }
                    }
                }
            }
        },
        { $match: { priceInt: { $gte: minPrice, $lte: maxPrice } } },  // Thêm điều kiện lọc giá sau khi chuyển đổi priceInt
        { $count: "total" }
    ];

    // Thực hiện truy vấn
    product = await Product.aggregate(aggregationPipeline).exec();
    const totalProductsResult = await Product.aggregate(totalProductsPipeline).exec();
    const totalProduct = totalProductsResult.length > 0 ? totalProductsResult[0].total : 0;
    const totalPage = Math.ceil(totalProduct / limit);

    // Lấy tên thương hiệu
    const brandIds = await Product.find({ category: { $in: categoryNames } }).distinct('brand_id').exec();
    const brandNames = brandIds.length > 0 ? await Brand.find({ _id: { $in: brandIds } }).exec() : [];
    const sizeList = await Product.find({ category: { $in: categoryNames } }).distinct('size.size').exec()

    return {
        product,
        totalPage,
        brandNames,
        sizeList
    }
}

const updateProduct = async (id, update) => {
    const productData = await Product.findById(id).exec()
    if (!productData) {
        throw new Error('Product not found');
    }
    const product = { ...productData._doc }
    product.name = update.name ?? product.name
    product.price = update?.size[0]?.price ?? product.price
    product.sale_price = update.sale_price ?? product.sale_price
    product.image = update.image ?? product.image
    product.description = update.description ?? product.description
    product.category = update.category ?? product.category
    product.brand_id = update.brand_id ?? product.brand_id
    product.slug = update.slug ?? product.slug
    product.status = update.status ?? product.status
    product.total = update.total ?? product.total
    product.size = update.size ?? product.size

    const productUpdated = await Product.findByIdAndUpdate(id, product, { new: true }).exec()
    return productUpdated
}

const deleteProducts = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result
}

export default {
    addProduct,
    getAllProduct,
    getProductBySlug,
    updateProduct,
    getProduct,
    deleteProducts,
}