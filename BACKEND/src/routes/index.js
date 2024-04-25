const ProductDetailRouter = require('./ProductDetailRouter')

const routes = (app) => {
    app.use('/api/product_detail', ProductDetailRouter)
}

module.exports = routes