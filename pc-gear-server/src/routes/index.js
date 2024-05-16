import MainCarouselRouter from './MainCarouselRouter.js'
import CartRouter from './CartRouter.js'
import UserRouter from './UserRouter.js'
import ProductRouter from './ProductRouter.js'
import ReviewRouter from './ReviewRouter.js'
import CategoriesRouter from './CategoryRoute.js'
import ProductDetailRouter from './ProductDetailRouter.js'
import OrderDetailRouter from './OrderDetailRouter.js'
import SendEmailRouter from './EmailRouter.js'
import ImgProductRouter from './ImgRouter.js'
import CarouselRouter from './CarouselRouter.js'
import CollectionRouter from './CollectionRouter.js'
import ConversationRouter from './ConversationRouter.js'
import PaymentRouter from './PaymentRouter.js'

const routes = (app) => {
  app.use('/api/cart', CartRouter)
  app.use('/api/user', UserRouter)
  app.use('/api/product', ProductRouter)
  app.use('/api/review', ReviewRouter)
  app.use("/api/categories", CategoriesRouter);
  app.use('/api/product_detail', ProductDetailRouter);
  app.use('/api/OrderDetail', OrderDetailRouter);
  app.use('/api/sendEmail', SendEmailRouter)
  app.use('/api/img', ImgProductRouter)
  app.use('/api/carousel', CarouselRouter)
  app.use('/api/main_carousel', MainCarouselRouter)
  app.use('/api/collection', CollectionRouter);
  app.use('/api/conversation', ConversationRouter);
  app.use('/api/payment', PaymentRouter);
}

export default routes