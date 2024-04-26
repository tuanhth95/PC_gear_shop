const CartRouter = require('./CartRouter');
const userRouter = require('./userRouter');
const apiProduct = require('./ProductRouter')
const ReviewRouter = require('./ReviewRouter')

const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', apiProduct)
  app.use('/api/review', ReviewRouter)
}
module.exports = routes