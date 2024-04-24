const express = require ("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
  }));
const port = process.env.PORT || 3001


app.use(bodyParser.json());

routes(app);



app.get('/', (req, res)=>{
    return res.send('Hello world');
})
const connectionString = 'mongodb+srv://20520825:lnoomd2NG59QK83k@webpc.efcl5hl.mongodb.net/?retryWrites=true&w=majority&appName=WebPC'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// mongoose.connect(`${process.env.MONGO_DB}`)
//     .then(()=>{
//         console.log('Connect Db success!')
//     })
//     .catch((err)=> {
//         console.log(err)
//     })

app.listen(port, () => {
    console.log('Server is running in port: ', + port);
}) 