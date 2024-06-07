const uploadImage = async (req, res) => {
    try {
        const fileData = req.file
        console.log(fileData)
        res.status(200).json(fileData)
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Upload failed"
        })
    }
}

export default {
    uploadImage
}