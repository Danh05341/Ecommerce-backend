import { Province } from "../models/index.js"


const getAllProvince = async (req, res) => {
    try {
        const province = await Province.find({}, {
            Type: 1,
            Code: 1,
            Name: 1,
            'District.Type': 1,
            'District.Code': 1,
            'District.FullName': 1,
            'District.ProvinceCode': 1,
            'District.Ward.Type': 1,
            'District.Ward.Code': 1,
            'District.Ward.FullName': 1,
            'District.Ward.DistrictCode': 1,
            
        })
        return res.status(200).json({
            message: 'Get all Province successfully',
            data: province
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get all Province failed"
        })
    }
}

export default {
    getAllProvince
}