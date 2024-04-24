const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
//const routes = require('./routes')
const cors = require('cors');
const bodyParser = require ("body-parser");
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiUser = require('./routes/userRouter')
const apiProduct = require('./routes/ProductRouter')
const cookieParser = require('cookie-parser')

dotenv.config()

const app= express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/user', apiUser)
app.use('/api/product', apiProduct)


//routes(app);

mongoose.connect(`mongodb+srv://21521665:${process.env.MONGO_DB}@cluster0.vzjoaqa.mongodb.net/`)
.then(()=>{
    console.log("connect DB success")
})
.catch((err)=>{
    console.log(err)
})
app.listen(port, () =>{
    console.log("server is running in port " + port)
})
