const CartRouter = require('./CartRouter');

const routes = (app) => {
  app.use('/cart', CartRouter)
}
module.exports = routes