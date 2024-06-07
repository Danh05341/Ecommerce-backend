import { Order } from '../models/index.js';
const PAGE_LIMIT = 10
const getAllOrder = async (query) => {
   const page = query.page;
   const limit = query.limit || PAGE_LIMIT;
   const skip = (page - 1) * limit
   
   try {
      const orders = await Order.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
      const totalPage = await Order.countDocuments({})
      
      return {
         orders,
         totalPage
      };
   } catch (error) {
      throw new Error('Failed get order');
   }
}

const createOrder = async ({ email, name, phone, address, city, district, ward, shippingFee, discountCode, discount, paymentMethod, productsOrder, totalPrice, userId }) => {
   try {
      // Create an object for the new order
      const orderData = {
         email,
         name,
         phone,
         address,
         province: city,
         district,
         ward,
         totalPrice,
         shippingFee,
         paymentMethod,
         productsOrder,
         userId
      };

      // Conditionally add discount fields if they are provided
      if (discountCode) {
         orderData.discountCode = discountCode;
      }
      if (discount) {
         orderData.discountAmount = discount;
      }

      // Create a new Order object
      const newOrder = await Order.create(orderData)
      return newOrder;
   } catch (error) {
      console.error("Error creating order:", error);
      throw new Error('Failed to create order');
   }
}

const getOrderDetailsById = async (id) => {
   try {
      const order = await Order.findById(id).exec();
      return order;
   } catch (error) {
      throw new Error('Failed get order');
   }
}

const getOrdersUserById = async (id, query) => {
   const page = query.page;
   const limit = query.limit || PAGE_LIMIT;
   const skip = (page - 1) * limit
   try {
      const order = await Order.find({userId: id}).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
      const totalPage = await Order.countDocuments({userId: id})
      return {
         order,
         totalPage
      };
   } catch (error) {
      throw new Error('Failed get order');
   }
}
const updateOrder = async (id, updateData) => {
   try {
      
      const order = await Order.findById(id).exec();
      console.log("cc: ", order);
      if (!order) {
         throw new Error('Order not found');
      }
      const newOrder = { ...order._doc, ...updateData }
      console.log("neworder: ",  order);

      // product.name = update.name ?? product.name
      // product.price = update.price ?? product.price
      // product.sale_price = update.sale_price ?? product.sale_price
      // product.image = update.image ?? product.image
      // product.description = update.description ?? product.description
      // product.category = update.category ?? product.category
      // product.brand_id = update.brand_id ?? product.brand_id
      // product.slug = update.slug ?? product.slug
      // product.status = update.status ?? product.status
      // product.total = update.total ?? product.total
      // product.size = update.size ?? product.size

      const orderUpdated = await Order.findByIdAndUpdate(id, newOrder, { new: true }).exec()
      return orderUpdated
   } catch (error) {
      throw new Error('Failed update order');
   }
}
export default {
   getAllOrder,
   createOrder,
   getOrdersUserById,
   getOrderDetailsById,
   updateOrder
}