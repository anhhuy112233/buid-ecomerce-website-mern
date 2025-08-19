// File khởi động server Express và kết nối MongoDB
const dotenv = require("dotenv"); // Đọc biến môi trường từ file .env
const express = require("express"); // Web framework để tạo API
const cors = require("cors"); // Cho phép gọi API từ domain khác (frontend)
const mongoose = require("mongoose"); // ODM kết nối MongoDB
const routes = require("./routes"); // Nơi khai báo các route con

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Cổng chạy server

// Middleware xử lý chung cho API
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Parse JSON body từ client (Postman/Frontend)


// Gắn toàn bộ route vào app (xem chi tiết ở src/routes/index.js) - Điều hướng đến routes
routes(app)

// Kiểm tra bắt buộc phải có URI của MongoDB trong .env
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

// Kết nối đến MongoDB Atlas bằng Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "ecommerce", // Tên database
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Khởi động server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
