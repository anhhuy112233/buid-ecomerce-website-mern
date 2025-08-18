const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "ecommerce",
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
