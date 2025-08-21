// Router dành cho nghiệp vụ Người dùng (User)
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authenticate,
  authorizeAdmin,
  authorizeSelfOrAdmin,
} = require("../middleware/authMiddleware");

// [POST] /api/users
// Mục đích: tạo mới user
router.post("/sign-up", userController.createUser);
// [POST] /api/users
// Mục đích: đăng nhập
router.post("/sign-in", userController.loginUser);
// [PUT] /api/users
// Mục đích: cập nhật lại thông tin tài khoản của user
router.put("/update-user/:id", userController.updateUser);
// [DELETE] /api/users
// Mục đích: xóa tài khoản của user
router.delete(
  "/delete-user/:id",
  authenticate,
  authorizeAdmin,
  userController.deleteUser
);

// [GET] /api/users/getAllUsers
// Mục đích: lấy danh sách tất cả users
router.get(
  "/getAllUsers",
  authenticate,
  authorizeAdmin,
  userController.getAllUsers
);

// [GET] /api/users/:id
// Mục đích: lấy thông tin user theo ID
router.get("/get-details/:id", authenticate, authorizeSelfOrAdmin, userController.getUserById);

module.exports = router;
