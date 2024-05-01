const ProductDetailRouter = require('./ProductDetailRouter')
const MainCarouselRouter = require('./MainCarouselRouter')

const routes = (app) => {
    app.use('/api/product_detail', ProductDetailRouter)
    app.use('/api/main_carousel', MainCarouselRouter)
}

module.exports = routes