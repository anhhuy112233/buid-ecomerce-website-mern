// Router dành cho nghiệp vụ Người dùng (User)
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// [POST] /api/users
// Mục đích: tạo mới user
router.post("/sign-up", userController.createUser);
// [POST] /api/users
// Mục đích: đăng nhập
router.post("/sign-in", userController.loginUser);

// [GET] /api/users
// Mục đích: lấy danh sách tất cả users
router.get("/", userController.getAllUsers);

// [GET] /api/users/:id
// Mục đích: lấy thông tin user theo ID
router.get("/:id", userController.getUserById);

module.exports = router;