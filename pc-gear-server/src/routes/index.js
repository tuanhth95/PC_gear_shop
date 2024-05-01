const ProductDetailRouter = require('./ProductDetailRouter')
const MainCarouselRouter = require('./MainCarouselRouter')
const OrderDetailRouter = require('./OrderDetailRouter')
const sendEmail = require('./emailRouter')  

const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', apiProduct)
  app.use('/api/review', ReviewRouter)
  app.use("/api/categories", categoriesRouter);
  app.use('/api/product_detail', ProductDetailRouter);
  app.use('/api/OrderDetail', OrderDetailRouter);
  app.use('/api/user', sendEmail)
  app.use('/api/main_carousel', MainCarouselRouter)
}

module.exports = routes