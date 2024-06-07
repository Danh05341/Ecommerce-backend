import crypto from 'crypto';
import querystring from 'qs';
import moment from 'moment';

const createVnpayUrl = (orderInfo, amount) => {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss')

    const vnp_TmnCode = process.env.vnp_TmnCode;
    const vnp_HashSecret = process.env.vnp_HashSecret;
    const vnp_Url = process.env.vnp_Url;
    const vnp_ReturnUrl = process.env.vnp_ReturnUrl;
    const vnp_TxnRef = Date.now().toString(); // Mã giao dịch
    const vnp_OrderInfo = orderInfo;
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

    return vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });
};

const sortObject = (obj) => {
    let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
};


const verifyVnpayReturnUrl = (query) => {
    const vnp_Params = query;
    const vnp_HashSecret = process.env.vnp_HashSecret;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return secureHash === signed;
};

export {
    createVnpayUrl,
    verifyVnpayReturnUrl,
    sortObject
}
