const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
dotenv.config()
const app= express()
const port = process.env.PORT || 3001
const routes = require('./routes')

app.use(bodyParser.json())

routes(app);
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(morgan("dev"))
// app.get ('/', (req, res)=>{
//     res.send('Hello world')
// })

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Cho phép truy cập từ mọi nguồn
    res.send({"msg": "This has cors enabled"})
  });

mongoose.connect(`mongodb+srv://21521375:em0cutBPEROHKVXd@quynh.xbflktd.mongodb.net/`)
.then(()=>{
    console.log("connect DB success")
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, () =>{
    console.log("server is running in port " + port)
})
