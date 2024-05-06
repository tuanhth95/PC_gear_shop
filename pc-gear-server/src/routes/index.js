const CartRouter = require('./CartRouter');
const userRouter = require('./userRouter');
const ProductRouter = require('./ProductRouter')
const ReviewRouter = require('./ReviewRouter')
const categoriesRouter = require('./categoryRoute')
const ProductDetailRouter = require('./ProductDetailRouter')
const OrderDetailRouter = require('./OrderDetailRouter')
const ImgProduct = require('./ImgRouter')
const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', ProductRouter)
  app.use('/api/review', ReviewRouter)
  app.use("/api/categories", categoriesRouter);
  app.use('/api/product_detail', ProductDetailRouter);
  app.use('/api/OrderDetail', OrderDetailRouter);
  app.use('/api/img', ImgProduct)
}

module.exports = routes