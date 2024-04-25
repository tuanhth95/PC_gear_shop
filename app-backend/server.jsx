require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import các routes
const categoriesRouter = require("./routes/categoryRoute.jsx");

// Khởi tạo app Express
const app = express();
const PORT = process.env.PORT || 5000;

// Sử dụng các middleware
app.use(cors()); // Cho phép các request từ các origin khác
app.use(bodyParser.json()); // Xử lý các JSON request

// Định nghĩa các route
app.use("/api/categories", categoriesRouter);

// Kết nối tới MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Chỉ khởi động server sau khi đã kết nối thành công tới MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Middleware xử lý khi không tìm thấy route phù hợp
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});
