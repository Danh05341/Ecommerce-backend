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
    // console.log('cart:', cart)
    const existingProductIndex = cart.items.findIndex(
        product => {
            return (product.productId.toString() === update.product._id && product.productSize === update.sizeActive && product.imageCurrent === update.currentImage)
        }
    );
    // console.log('update:', update)
    if (existingProductIndex !== -1) {
        // Nếu có, thay đổi quantity
        if (update.setCount) {
            cart.items[existingProductIndex].quantity = Number(update.value);
        } else {
            cart.items[existingProductIndex].quantity += Number(update.value);
        }
    } else {
        // Nếu không, thêm update vào mảng items
        cart.items.push({
            productId: update.product._id,
            quantity: update.value,
            imageCurrent: update.currentImage,
            productSize: update.sizeActive
        });
    }
    await cart.save();
    return cart
}

const deleteProductCart = async (idCart, body) => {
    const productId = body.id
    const productSize = body.size
    const imageCurrent = body.image
    const cart = await Cart.findById(idCart).exec();
    const existingProductIndex = cart.items.findIndex(
        product => (product.productId.toString() === productId && product.productSize === productSize && product.imageCurrent === imageCurrent)
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