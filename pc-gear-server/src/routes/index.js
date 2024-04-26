const CartRouter = require('./CartRouter');
const userRouter = require('./userRouter');
const apiProduct = require('./ProductRouter')

const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', apiProduct)
}
module.exports = routes