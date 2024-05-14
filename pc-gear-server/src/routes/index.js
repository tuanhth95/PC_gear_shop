const MainCarouselRouter = require('./MainCarouselRouter')
const CartRouter = require('./CartRouter')
const userRouter = require('./userRouter')
const apiProduct = require('./ProductRouter')
const ReviewRouter = require('./ReviewRouter')
const categoriesRouter = require('./categoryRoute')
const ProductDetailRouter = require('./ProductDetailRouter')
const OrderDetailRouter = require('./OrderDetailRouter')
const sendEmail = require('./emailRouter')
const ImgProduct = require('./ImgRouter')
const Carousel = require('./CarouselRouter')
const CollectionRouter = require('./CollectionRouter')
const ConversationRouter = require('./ConversationRouter')

const routes = (app) => {
  app.use('/cart', CartRouter)
  app.use('/api/user', userRouter)
  app.use('/api/product', apiProduct)
  app.use('/api/review', ReviewRouter)
  app.use("/api/categories", categoriesRouter);
  app.use('/api/product_detail', ProductDetailRouter);
  app.use('/api/OrderDetail', OrderDetailRouter);
  app.use('/api/sendEmail', sendEmail)
  app.use('/api/img', ImgProduct)
  app.use('/api/carousel', Carousel)
  app.use('/api/main_carousel', MainCarouselRouter)
  app.use('/api/collection', CollectionRouter);
  app.use('/api/conversation', ConversationRouter);
}

module.exports = routes