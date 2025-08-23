// Controller tiếp nhận request/response cho tài nguyên Product
// Thực tế controller sẽ gọi xuống Service để xử lý nghiệp vụ và thao tác DB.

const ProductService = require("../services/ProductService");

// [POST] /api/products/create-product
// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } = req.body;

    // Validate dữ liệu đầu vào
    if (!name || !image || !type || !price || !countInStock || !rating || !description) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const result = await ProductService.createProduct(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [GET] /api/products/get-all
// Lấy tất cả sản phẩm với pagination, sorting và filtering
const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, type, minPrice, maxPrice, rating, name } = req.query;

    // Xử lý filter
    const filter = {};
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.minPrice = minPrice;
      filter.maxPrice = maxPrice;
    }
    if (rating) filter.rating = rating;
    if (name) filter.name = name;

    const result = await ProductService.getAllProducts(
      parseInt(limit),
      parseInt(page),
      sort,
      Object.keys(filter).length > 0 ? filter : null
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [GET] /api/products/get-details/:id
// Lấy thông tin chi tiết sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [PUT] /api/products/update/:id
// Cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, type, price, countInStock, rating, description } = req.body;

    // Validate dữ liệu đầu vào
    if (!name || !image || !type || !price || !countInStock || !rating || !description) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const result = await ProductService.updateProduct(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [DELETE] /api/products/delete/:id
// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [GET] /api/products/search
// Tìm kiếm sản phẩm theo tên
const searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu từ khóa tìm kiếm",
      });
    }

    const result = await ProductService.searchProducts(q, parseInt(limit));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

// [GET] /api/products/type/:type
// Lấy sản phẩm theo loại
const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 10 } = req.query;

    const result = await ProductService.getProductsByType(type, parseInt(limit));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByType,
};
