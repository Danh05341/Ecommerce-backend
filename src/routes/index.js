import userRouter from './user.js'
import productRouter from './product.js'
import categoryRouter from './category.js'
import sliderRouter from './slider.js'
import bannerRouter from './banner.js'
import brandRouter from './brand.js'

function route(app) {
    app.use('/users', userRouter)
    app.use('/product', productRouter)
    app.use('/category', categoryRouter)
    app.use('/slider', sliderRouter)
    app.use('/banner', bannerRouter)
    app.use('/brand', brandRouter)

}

export default route;