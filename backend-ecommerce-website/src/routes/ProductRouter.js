// Router dành cho nghiệp vụ Sản phẩm (Product)
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

const {
  authenticate,
  authorizeAdmin,
  authorizeSelfOrAdmin,
} = require("../middleware/authMiddleware");

// CREATE - Tạo sản phẩm mới
router.post("/create-product", ProductController.createProduct);

// READ - Lấy tất cả sản phẩm với pagination, sorting và filtering
router.get("/get-all", ProductController.getAllProducts);

// READ - Lấy thông tin chi tiết sản phẩm theo ID
router.get("/get-details/:id", ProductController.getProductById);

// UPDATE - Cập nhật thông tin sản phẩm
router.put("/update/:id", authenticate, authorizeSelfOrAdmin, ProductController.updateProduct);

// DELETE - Xóa sản phẩm
router.delete("/delete/:id", ProductController.deleteProduct);

// SEARCH - Tìm kiếm sản phẩm theo tên
router.get("/search", ProductController.searchProducts);

// FILTER - Lấy sản phẩm theo loại
router.get("/type/:type", ProductController.getProductsByType);

module.exports = router;
