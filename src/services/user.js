import { User } from '../models/index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async ({
    firstName,
    lastName,
    email,
    password,
    image
}) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
    );
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        image
    })
    return {
        ...newUser._doc,
        password: "not show"
    }

}

const generateAccesstoken = async (id) => {
    return (
        await jwt.sign(
            { data: id },
            process.env.JWT_SECRET,
            { expiresIn: '60s' }
        )
    )
}

const generateRefreshToken = async (id) => {
    return (
        await jwt.sign(
            { data: id },
            process.env.JWT_SECRET,
            { expiresIn: '365d' }
        )
    )
}

const login = async ({ email, password }) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
            const accessToken = await generateAccesstoken(existingUser._id)
            const refreshToken = await generateRefreshToken(existingUser._id)

            return {
                ...existingUser.toObject(),
                password: "not show",
                token: {
                    accessToken,
                    refreshToken
                }
            }
        }
        else {
            throw new Error('Wrong username or password')
        }
    }
    throw new Error('Wrong username or password')
}


const refreshToken = async (token) => {
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        
        const accessToken = await generateAccesstoken(jwtObject.data)
        const refreshToken = await generateRefreshToken(jwtObject.data)
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default {
    register,
    login,
    refreshToken
}