import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connect Succesfully')
    } catch(err) {
        console.log('DB connect Failed' + err)
    }
}

export default { connect }