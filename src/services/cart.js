import { Cart } from '../models/index.js';

const getAllCart = async () => {
    const carts = await Cart.find({}).exec()
    return carts
}
const getCartById = async (id) => {
    const cart = await Cart.findById(id).populate('items.productId').exec();
    return cart
}
const updateCart = async (id, update) => {
    
    const cart = await Cart.findById(id).exec();
    const existingProductIndex = cart.items.findIndex(
        product => product.productId.toString() === update._id
    );
    if (existingProductIndex !== -1) {
        // Nếu có, tăng quantity
        cart.items[existingProductIndex].quantity += 1;
    } else {
        // Nếu không, thêm update vào mảng items
        cart.items.push({
            productId: update._id,
            quantity: 1,
        });
    }
    await cart.save();
    return cart
}

const deleteProductCart = async (idCart, productId) => {
    const cart = await Cart.findById(idCart).exec();
    const existingProductIndex = cart.items.findIndex(
        product => product.productId.toString() === productId
    );
    if (existingProductIndex !== -1) {
        cart.items.splice(existingProductIndex, 1);
    } else {
        throw new Error("Không tìm thấy sản phẩm")
    }
    await cart.save();
    return cart
}

export default {
    getAllCart,
    getCartById,
    updateCart,
    deleteProductCart
}