import { Order } from '../models/index.js';
import { format } from 'date-fns';
const PAGE_LIMIT = 10
import { dateConverterUTC } from '../utils/date.js';

const getAllOrder = async (queryParams) => {
   // const page = query.page || 1;
   // const limit = query.limit || PAGE_LIMIT;
   // let statusProcessing = query.status ? [...query.status.split(',')] : 'all'
   // const skip = (page - 1) * limit

   // let orders = []
   // let totalPage = 0
   // try {
   //    if (statusProcessing === 'all' || statusProcessing[0] === 'all') {
   //       orders = await Order.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
   //       totalPage = await Order.countDocuments({})
   //    } else {
   //       orders = await Order.find({ proccesingStatus: statusProcessing }).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
   //       totalPage = await Order.countDocuments({ proccesingStatus: statusProcessing })
   //    }

   try {
      const { status, limit, page, startDate, endDate } = queryParams;
      let query = {};
      console.log('queryParams: ', queryParams);
      if (status && status !== 'all') {
         query.proccesingStatus = { $in: status.split(',') };
      }
      ////
      const endDateUTC = dateConverterUTC(endDate);

      // Cộng thêm một ngày
      endDateUTC.setDate(endDateUTC.getDate() + 1);

      // Tạo một đối tượng `Date` mới chứa ngày đã được cộng thêm
      const newEndDate = new Date(endDateUTC);
      //////
      // console.log('start: ', new Date(dateConverterUTC(startDate)))
      // console.log('end: ', newEndDate)
      // console.log('datef: ', new Date((startDate)).setUTCHours(0, 0, 0, 0))
      // console.log('datel: ', new Date((endDate)).setUTCHours(23, 59, 59, 999))
      // console.log('date1: ', new Date(new Date((startDate)).setUTCHours(0, 0, 0, 0)))
      // console.log('date2: ', new Date(new Date((endDate)).setUTCHours(23, 59, 59, 999)))

      if (startDate && endDate) {
         query.createdAt = {
            $gte: new Date(dateConverterUTC(startDate)),
            $lte: newEndDate
         };
      } else if (startDate) {
         query.createdAt = { $gte: new Date(dateConverterUTC(startDate)) };
      } else if (endDate) {
         query.createdAt = { $lte: newEndDate };
      }

      const orders = await Order.find(query)
         .limit(limit ? parseInt(limit) : 10)
         .skip(page ? (parseInt(page) - 1) * limit : 0)
         .sort({ createdAt: -1 })
      const totalPage = await Order.countDocuments(query);

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

const getOrdersUserById = async (id, queryParams) => {
   // const page = query.page;
   // const limit = query.limit || PAGE_LIMIT;
   // const skip = (page - 1) * limit
   // try {
   //    const order = await Order.find({ userId: id }).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
   //    const totalPage = await Order.countDocuments({ userId: id })
   //    return {
   //       order,
   //       totalPage
   //    };
   try {
      const { status, limit, page, startDate, endDate } = queryParams;
      let query = { userId: id };
      console.log('queryParams: ', queryParams);
      if (status && status !== 'all') {
         query.proccesingStatus = { $in: status.split(',') };
      }
      ////
      const endDateUTC = dateConverterUTC(endDate);

      // Cộng thêm một ngày
      endDateUTC.setDate(endDateUTC.getDate() + 1);

      // Tạo một đối tượng `Date` mới chứa ngày đã được cộng thêm
      const newEndDate = new Date(endDateUTC);
      //////
      // console.log('start: ', new Date(dateConverterUTC(startDate)))
      // console.log('end: ', newEndDate)
      // console.log('datef: ', new Date((startDate)).setUTCHours(0, 0, 0, 0))
      // console.log('datel: ', new Date((endDate)).setUTCHours(23, 59, 59, 999))
      // console.log('date1: ', new Date(new Date((startDate)).setUTCHours(0, 0, 0, 0)))
      // console.log('date2: ', new Date(new Date((endDate)).setUTCHours(23, 59, 59, 999)))

      if (startDate && endDate) {
         query.createdAt = {
            $gte: new Date(dateConverterUTC(startDate)),
            $lte: newEndDate
         };
      } else if (startDate) {
         query.createdAt = { $gte: new Date(dateConverterUTC(startDate)) };
      } else if (endDate) {
         query.createdAt = { $lte: newEndDate };
      }

      const order = await Order.find(query)
         .limit(limit ? parseInt(limit) : 10)
         .skip(page ? (parseInt(page) - 1) * limit : 0)
         .sort({ createdAt: -1 })

      const totalPage = await Order.countDocuments(query);
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
      console.log("neworder: ", order);

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
const groupBy = (array, key) => {
   return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
   }, {});
};
const getRevenueSummary = async (body) => {
   const startDate = body.startDate
   const endDate = body.endDate
   const orders = await Order.find({proccesingStatus: 'finish'}, { createdAt: 1, totalPrice: 1 }).exec()
   const newOrder = orders.map(order => {
      return {
         createdAt: format(new Date(order.createdAt), 'yyyy-MM-dd'),
         totalPrice: order.totalPrice
      }
   })

   // Endpoint cho doanh thu hàng ngày
   const filteredOrders = newOrder.filter(order => order.createdAt >= startDate && order.createdAt <= endDate);
   const groupedOrders = groupBy(filteredOrders, 'createdAt');
   const dailyRevenue = Object.keys(groupedOrders).map(date => ({
      date,
      revenue: groupedOrders[date].reduce((sum, order) => {
         sum += Number(order.totalPrice.replace(/\./g, ''))
         console.log('or: ', order)
         return sum
      }, 0),
   }));

   return dailyRevenue
   
}
export default {
   getAllOrder,
   createOrder,
   getOrdersUserById,
   getOrderDetailsById,
   updateOrder,
   getRevenueSummary
}