import crypto from 'crypto';
import querystring from 'qs';
import moment from 'moment';
import { sortObject } from '../utils/vnpay.js';
import Order from '../models/Order.js';

const createUrlPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss')

        const vnp_TmnCode = process.env.vnp_TmnCode;
        const vnp_HashSecret = process.env.vnp_HashSecret;
        const vnp_Url = process.env.vnp_Url;
        const vnp_ReturnUrl = process.env.vnp_ReturnUrl;
        const vnp_TxnRef = orderId; // Mã giao dịch
        const vnp_OrderInfo = 'Noi dung thanh toan';
        const vnp_Amount = amount * 100; // Số tiền phải nhân với 100 để đổi ra đồng
        const vnp_OrderType = 'billpayment';
        const vnp_Locale = 'vn';
        const vnp_IpAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = vnp_Locale;
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = vnp_TxnRef;
        vnp_Params['vnp_OrderInfo'] = vnp_OrderInfo;
        vnp_Params['vnp_OrderType'] = vnp_OrderType;
        vnp_Params['vnp_Amount'] = vnp_Amount;
        vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = vnp_IpAddr;
        vnp_Params['vnp_CreateDate'] = createDate;

        vnp_Params = sortObject(vnp_Params);
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        const paymentUrl = vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

        return res.status(200).json({
            message: 'Post createUrlPayment successfully',
            data: paymentUrl
        })
    } catch (error) {
        return res.json({
            error: error.toString(),
            message: "Post createUrlPayment failed"
        })
    }
}


const paymentReturn = async (req, res) => {
    let vnp_Params = req.query;
    const vnp_HashSecret = process.env.vnp_HashSecret;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        // Giao dịch hợp lệ
        const orderId = vnp_Params['vnp_TxnRef'];
        const responseCode = vnp_Params['vnp_ResponseCode'];

        try {
            if (responseCode === '00') {
                // Thanh toán thành công, cập nhật trạng thái đơn hàng
                await Order.findByIdAndUpdate(orderId, { status: 'paid' });
                res.redirect(`${process.env.FE_HOST}/payment/status?orderId=${orderId}&success=true`);
            } else {
                // Thanh toán không thành công
                await Order.findByIdAndUpdate(orderId, { status: 'Failed' });
                res.redirect(`http://localhost:3000/payment/status?orderId=${orderId}&success=false`);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        // Giao dịch không hợp lệ
        res.status(400).send('Invalid transaction');
    }
}

export default {
    createUrlPayment,
    paymentReturn
}