const ReviewRouter = require('./ReviewRouter')

const routes = (app)=>{
    app.use('/api/review', ReviewRouter)
}
module.exports = routes