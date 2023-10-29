import { Category } from '../models/index.js';

const getAllCategory = async () => {
    const categories = await Category.aggregate([
        {
            $match: { parent: null } //lọc ra danh mục có parent = null
        },
        {
            $lookup: {
                from: 'categories', //<collection to join>
                localField: 'name', //<field from the input documents>
                foreignField: 'parent', //<field from the documents of the "from" collection>
                as: 'children' //<output array field>
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                parent: 1,
                children: 1,
                createdAt: 1,
                updatedAt: 1
            }//chỉ định những trường cần hiển thị/ loại bỏ trường đó bằng cách xóa trong $project
        }
    ]);
    return categories;
}

export default {
    getAllCategory
}