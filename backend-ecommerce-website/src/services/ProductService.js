const Product = require("../models/ProductModel");

// CREATE - Tạo mới sản phẩm
const createProduct = async (productData) => {
  try {
    const { name, image, type, price, countInStock, rating, description } = productData;

    // Kiểm tra sản phẩm đã tồn tại chưa
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error("Sản phẩm đã tồn tại trong hệ thống");
    }

    // Khởi tạo sản phẩm mới
    const newProduct = new Product({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
    });

    // Lưu sản phẩm
    await newProduct.save();

    return {
      status: "OK",
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Sản phẩm đã tồn tại trong hệ thống");
    }
    throw error;
  }
};

// READ - Lấy tất cả sản phẩm
const getAllProducts = async (limit, page, sort, filter) => {
  try {
    let query = Product.find();

    // Áp dụng filter nếu có
    if (filter) {
      if (filter.type) {
        query = query.where('type', filter.type);
      }
      if (filter.name) {
        // Tìm kiếm theo tên sản phẩm (không phân biệt hoa thường)
        query = query.where('name', { $regex: filter.name, $options: 'i' });
      }
      if (filter.minPrice || filter.maxPrice) {
        let priceFilter = {};
        if (filter.minPrice) priceFilter.$gte = filter.minPrice;
        if (filter.maxPrice) priceFilter.$lte = filter.maxPrice;
        query = query.where('price', priceFilter);
      }
      if (filter.rating) {
        query = query.where('rating', { $gte: filter.rating });
      }
    }

    // Áp dụng sort nếu có
    if (sort) {
      query = query.sort(sort);
    } else {
      query = query.sort({ createdAt: -1 }); // Mặc định sort theo thời gian tạo mới nhất
    }

    // Áp dụng pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const products = await query.exec();
    const total = await Product.countDocuments();

    return {
      status: "OK",
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

// READ - Lấy sản phẩm theo ID
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return {
      status: "OK",
      message: "Lấy thông tin sản phẩm thành công",
      data: product,
    };
  } catch (error) {
    throw error;
  }
};

// UPDATE - Cập nhật sản phẩm
const updateProduct = async (productId, updateData) => {
  try {
    const { name, image, type, price, countInStock, rating, description } = updateData;

    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    // Kiểm tra tên sản phẩm mới có trùng với sản phẩm khác không
    if (name && name !== existingProduct.name) {
      const duplicateProduct = await Product.findOne({ name, _id: { $ne: productId } });
      if (duplicateProduct) {
        throw new Error("Tên sản phẩm đã tồn tại");
      }
    }

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      },
      { new: true, runValidators: true }
    );

    return {
      status: "OK",
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Tên sản phẩm đã tồn tại");
    }
    throw error;
  }
};

// DELETE - Xóa sản phẩm
const deleteProduct = async (productId) => {
  try {
    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    // Xóa sản phẩm
    await Product.findByIdAndDelete(productId);

    return {
      status: "OK",
      message: "Xóa sản phẩm thành công",
    };
  } catch (error) {
    throw error;
  }
};

// Tìm kiếm sản phẩm theo tên
const searchProducts = async (searchTerm, limit = 10) => {
  try {
    const products = await Product.find({
      name: { $regex: searchTerm, $options: 'i' }
    }).limit(limit);

    return {
      status: "OK",
      message: "Tìm kiếm sản phẩm thành công",
      data: products,
    };
  } catch (error) {
    throw error;
  }
};

// Lấy sản phẩm theo loại
const getProductsByType = async (type, limit = 10) => {
  try {
    const products = await Product.find({ type }).limit(limit);

    return {
      status: "OK",
      message: "Lấy sản phẩm theo loại thành công",
      data: products,
    };
  } catch (error) {
    throw error;
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
