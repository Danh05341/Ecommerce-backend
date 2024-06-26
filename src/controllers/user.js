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

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await userService.createUser({
            name, email, password, role 
        })
        return res.status(200).json({
            message: 'Create user successfully',
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
const getUserById = async (req, res) => {
    try {
        const existingUser = await userService.getUserById(req.params.id)
        if(!existingUser) throw new Error('User not found')
        return res.status(200).json({
            message: 'Get user successfully',
            data: existingUser
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get user failed"
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const existingUser = await userService.getAllUsers()
        if(!existingUser) throw new Error('User not found')
        return res.status(200).json({
            message: 'Get List user successfully',
            data: existingUser
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Get List user failed"
        })
    }
}
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserById(req.params.id, req.body)
        return res.status(200).json({
            message: 'Update user successfully',
            data: updatedUser
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Update user failed"
        })
    }
}


const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUserById(req.params.id)
        return res.status(200).json({
            message: 'deleted User successfully',
            data: deletedUser
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "deleted User failed"
        })
    }
}
const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const result = await userService.changePassword({ userId, oldPassword, newPassword })
        return res.status(200).json({
            message: 'ChangePassWord User successfully',
            data: result
        })
    } catch (error) {
        return res.json({
            error: error.message.toString(),
            message: "ChangePassWord User failed"
        })
    }
}

export default {
    register,
    createUser,
    login,
    refreshToken,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    changePassword
}