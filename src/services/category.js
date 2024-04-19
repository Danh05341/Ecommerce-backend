import { Category } from '../models/index.js';

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
    const getCategoriesWithChildren = async (parentId = null) => {
        const categories = await Category.find({ parent: parentId }).exec();
        const result = [];
    
        for (const category of categories) {
            const children = await getCategoriesWithChildren(category.name);
            const categoryObj = category.toObject();
            if (children.length > 0) {
                categoryObj.children = children;
            }
            result.push(categoryObj);
        }
        return result;
    }
    const categories = await getCategoriesWithChildren();
    console.log(categories)

    return categories;
}

const getCategoryBySlug = async (slug) => {
   
    const category = await Category.findOne({slug}).exec();
    if (!category) {
        throw new Error(`Category not found`)
    }
    return category;
}

export default {
    getAllCategory,
    getCategoryBySlug
}