import userRouter from './user.js'
import productRouter from './product.js'
import categoryRouter from './category.js'
import sliderRouter from './slider.js'
import bannerRouter from './banner.js'
import brandRouter from './brand.js'
import cartRouter from './cart.js'
import uploadRouter from './upload.js'
import provinceRouter from './province.js'
import paymentRouter from './payment.js'
import orderRouter from './order.js'
import discountRouter from './discount.js'

function route(app) {
    app.use('/users', userRouter)
    app.use('/product', productRouter)
    app.use('/category', categoryRouter)
    app.use('/slider', sliderRouter)
    app.use('/banner', bannerRouter)
    app.use('/brand', brandRouter)
    app.use('/cart', cartRouter)
    app.use('/upload', uploadRouter)
    app.use('/province', provinceRouter)
    app.use('/payment', paymentRouter)
    app.use('/order', orderRouter)
    app.use('/discount', discountRouter)
}

export default route;