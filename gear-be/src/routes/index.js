const userRouter = require('./userRouter')
const OrderDetailRouter = require('./OrderDetailRouter')
const routes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/OrderDetail', OrderDetailRouter)
};

module.exports = routes