import userRouter from './user.js'
import productRouter from './product.js'

function route(app) {
    app.use('/users', userRouter)
    app.use('/product', productRouter)

}

export default route;