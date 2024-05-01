import { Category } from "../models/index.js";

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

function getAllCategoryNames(categories) {
    let categoryNames = [];

    categories.forEach(category => {
        categoryNames.push(category.name); // Lấy tên của danh mục hiện tại

        if (category.children) {
            // Nếu danh mục hiện tại có danh mục con, thực hiện đệ quy để lấy tên của các danh mục con
            const childrenNames = getAllCategoryNames(category.children);
            categoryNames = categoryNames.concat(childrenNames); // Nối tên của các danh mục con vào mảng categoryNames
        }
    });

    return categoryNames;
}

export { getCategoriesWithChildren, getAllCategoryNames } 