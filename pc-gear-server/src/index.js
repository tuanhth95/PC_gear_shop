const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require("body-parser");
const cors = require('cors')

dotenv.config()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.use(cors())
app.use(bodyParser.json())

routes(app)

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('listening on port ' + port)
})
