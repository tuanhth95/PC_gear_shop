const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require("body-parser");
const cors = require('cors')
// const morgan = require('morgan');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const apiProductDetail = require('./routes/ProductDetailRouter')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
// app.use(morgan('dev'));
// app.use('/api/getProductDetail', apiProductDetail)

routes(app)

mongoose.connect(`mongodb+srv://21521374:${process.env.MONGO_DB}@cluster0.azxbcjj.mongodb.net/pc_gear?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('listening on port ' + port)
})