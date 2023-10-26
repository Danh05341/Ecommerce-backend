import { User } from '../models/index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
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
        confirmPassword,
        image
    })
    return {
        ...newUser._doc,
        password: "not show"
    }

}
const login = async ({ email, password }) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
            const token = await jwt.sign(
                {data: existingUser._id},
                process.env.JWT_SECRET,
                {expiresIn: '60s'}
            )
            return {
                ...existingUser.toObject(),
                password: "not show",
                token: token
            }
        }
        else {
            throw new Error('Wrong username or password')
        }
    }
    throw new Error('Wrong username or password')
}

export default {
    register,
    login,
}