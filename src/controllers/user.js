import { userService } from '../services/index.js'

const register = async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;
    try {
        const user = await userService.register({
            firstName,
            lastName,
            email,
            password,
            image
        })
        return res.status(200).json({
            message: 'Register user successfully',
            data: user
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "error creating user"
        })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userService.login({ email,password })
        return res.status(200).json({
            message: 'Login user successfully',
            data: existingUser
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Login user failed"
        })
    }
}
const refreshToken = async (req, res) => {
    const refreshToken = req.headers.authorization.split(' ')[1]
    try {
        if(!refreshToken) {
            throw new Error('Invalid refresh token')
        }
        const response = await userService.refreshToken(refreshToken)
        return res.status(200).json({
            token: response
        })
        
    } catch (error) {
        return res.status(400).json({
            error: error.toString(),
            message: error.message
        })
    }
}
export default {
    register,
    login,
    refreshToken
}