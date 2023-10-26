import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next){
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        const jwtObject = jwt.verify(token, process.env)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}