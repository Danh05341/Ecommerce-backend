import { Banner, Product } from '../models/index.js';


const getAllBanner = async () => {
    // Trả về giá trị duy nhất của trường được chỉ định
    // const banner = await Banner.distinct('category_name').exec()
    // const banner = ['Giày thể thao', 'Giày nam']
    // console.log('banner: ', banner)
    // const result = await Product.aggregate([
    //     {
    //         $match: { category: { $in: banner } }
    //     }
    // ])
    const banner = await Banner.find({})
    return banner
}

export default {
    getAllBanner
}