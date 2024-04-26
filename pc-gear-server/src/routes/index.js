const CartRouter = require('./CartRouter');
const userRouter = require('./userRouter');
const apiProduct = require('./ProductRouter')
const ReviewRouter = require('./ReviewRouter')
const categoriesRouter = require('./categoryRoute')
const ProductDetailRouter = require('./ProductDetailRouter')

const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', apiProduct)
  app.use('/api/review', ReviewRouter)
  app.use("/api/categories", categoriesRouter);
  app.use('/api/product_detail', ProductDetailRouter);
}
module.exports = routes