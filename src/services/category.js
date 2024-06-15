import { Category, Product } from '../models/index.js';
import { getAllCategoryNames, getCategoriesWithChildren } from '../utils/category.js'

const getAllCategory = async () => {
    // const categories = await Category.aggregate([
    //     {
    //         $match: { parent: null } 
    //     },
    //     {
    //         $lookup: {
    //             from: 'categories', //<collection to join>
    //             localField: 'name', //<field from the input documents>
    //             foreignField: 'parent', //<field from the documents of the "from" collection>
    //             as: 'children' //<output array field>
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             name: 1,
    //             description: 1,
    //             parent: 1,
    //             children: 1,
    //             createdAt: 1,
    //             updatedAt: 1
    //         }//chỉ định những trường cần hiển thị/ loại bỏ trường đó bằng cách xóa trong $project
    //     }
    // ]);
    // Get All Categories
    const categories = await getCategoriesWithChildren();
    return categories;
}

const getCategoryBySlug = async (slug) => {

    if (slug === 'all') {
        return await Category.find({})
    }
    const category = await Category.findOne({ slug }).exec();
    if (!category) {
        throw new Error(`Category not found`)
    }
    return category;
}

const quantityProduct = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search ? { name: new RegExp(query.search, 'i') } : {};
    // const categories = await Product.distinct('category');

    // // Tạo một mảng các promise để đếm số lượng sản phẩm trong mỗi danh mục
    // const categoryCounts = await Promise.all(
    //     categories.map(async (category) => {
    //         const count = await Product.countDocuments({ category });
    //         return { category, count };
    //     }))

    // return categories;

    // Lấy tất cả các danh mục từ bảng Category
    const allCategories = await Category.find(search, 'name').exec();

    // Lấy tổng số danh mục để tính toán tổng số trang
    const totalCategoriesCount = allCategories.length;

    // Tạo một đối tượng để lưu trữ số lượng sản phẩm cho từng danh mục
    const categoryProductCount = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        }
    ]);

    const categoryCountMap = categoryProductCount.reduce((acc, item) => {
        acc[item._id] = item.count;  
        return acc;
    }, {});

    // Ghép số lượng sản phẩm vào các danh mục
    const categories = allCategories.map(category => ({
        name: category.name,
        count: categoryCountMap[category.name] || 0
    }));
    console.log('categories: ' + categories)

  // Sắp xếp danh mục theo số lượng sản phẩm
    const sortedCategories = categories.sort((a, b) => b.count - a.count);

    // Phân trang danh mục
    const paginatedCategories = sortedCategories.slice(skip, skip + limit);

    // Tính tổng số trang
    const totalPages = Math.ceil(totalCategoriesCount / limit);

    // Tính tổng số sản phẩm
    const totalProduct = await Product.countDocuments({}).exec();

    return {
        categories: paginatedCategories,
        page,
        totalPages,
        totalCategories: totalCategoriesCount,
        totalProduct
    };
}

const createCategory = async (body) => {
    const { name } = body;
    const categoryName = await Category.findOne({ name: name }).exec();
    if (categoryName) {
        throw new Error('Tên danh mục đã tồn tại')
    }
    const category = await Category.create({ ...body })
    return category
}
const deleteManyCategory = async (toDelete) => {
    const deletedCategory = await Category.deleteMany({ name: { $in: toDelete } }).exec();
    return deletedCategory
}

export default {
    getAllCategory,
    getCategoryBySlug,
    quantityProduct,
    createCategory,
    deleteManyCategory
}