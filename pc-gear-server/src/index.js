const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require("body-parser");
const cors = require('cors')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

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
