import { userService } from '../services/index.js'

const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, image } = req.body;
    try {
        const user = await userService.register({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
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

export default {
    register,
    login
}