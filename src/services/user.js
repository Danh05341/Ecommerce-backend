import { Cart, User } from '../models/index.js';
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
    const cart = new Cart()
    await cart.save();

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        image,
        cart_id: cart._id
    })
    return {
        ...newUser._doc,
        password: "not show"
    }

}


const createUser = async ({
    name, email, password, role
}) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
    );
    const cart = new Cart()
    await cart.save();

    const newUser = await User.create({
        firstName: name,
        email,
        password: hashPassword,
        cart_id: cart._id,
        role
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

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found')
    return user
}

const getAllUsers = async () => {
    const user = await User.find({});
    if (!user) throw new Error('User not found')
    return user
}

const updateUserById = async (id, updateData) => {
    const user = await User.findById(id).exec();
    if (!user) throw new Error('User not found')
    const newUser = { ...user._doc, ...updateData }
    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true }).exec()
    return userUpdated
}

const deleteUserById = async (id) => {
    const userDeleted = await User.findByIdAndDelete(id).exec();
    await Cart.findByIdAndDelete(userDeleted.cart_id).exec();
    return userDeleted
}

const changePassword = async ({ userId, oldPassword, newPassword }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Không tìm thấy user');

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) throw new Error('Mật khẩu cũ không đúng');

    const hashPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUND)
    );
    user.password = hashPassword;
    await user.save();
    return user
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