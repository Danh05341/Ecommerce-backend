import { createVnpayUrl } from '../utils/vnpay.js'

const createUrlPayment = async ({ orderInfo, amount }) => {
    const paymentUrl = createVnpayUrl(orderInfo, amount);
    return paymentUrl
}

export default {
    createUrlPayment
}