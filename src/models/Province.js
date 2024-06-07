import mongoose, { Schema } from 'mongoose'

// Định nghĩa schema cho dữ liệu tỉnh thành
const provinceSchema = new Schema({
    Name: String,
    Code: String,
    Type: String,
    district: [{
        FullName: String,
        Code: String,
        Type: String,
        ProvinceCode: String,
        ward: [{
            FullName: String,
            Code: String,
            Type: String,
            DistrictCode: String
        }]
    }]
});

export default mongoose.model('Province', provinceSchema);
