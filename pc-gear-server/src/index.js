// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const routes = require("./routes");
// const cors = require('cors');
// const bodyParser = require("body-parser");
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser')
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(cookieParser());
// routes(app);

// mongoose
//   .connect(process.env.DB_PATH)
//   .then(() => console.log("Connect successful"))
//   .catch((err) => console.log("error when connect to db: ", err));

// app.listen(port, () => {
//   console.log("Server is running on port: ", port);
// });

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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

mongoose
  .connect(process.env.DB_PATH,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log("Connect successful"))
  .catch((err) => console.log("error when connect to db: ", err));

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
