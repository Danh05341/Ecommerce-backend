import userRouter from './user.js'
import productRouter from './product.js'
import categoryRouter from './category.js'

function route(app) {
    app.use('/users', userRouter)
    app.use('/product', productRouter)
    app.use('/category', categoryRouter)

}

export default route;