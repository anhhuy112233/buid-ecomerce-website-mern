# 📦 Product Management - Quản Lý Sản Phẩm

Hướng dẫn chi tiết về tính năng quản lý sản phẩm trong hệ thống E-commerce Backend.

## 🎯 Tổng Quan

Tính năng Product Management cung cấp đầy đủ các chức năng CRUD (Create, Read, Update, Delete) cho việc quản lý sản phẩm, bao gồm:

- ✅ Tạo sản phẩm mới
- ✅ Lấy danh sách sản phẩm với pagination
- ✅ Lấy chi tiết sản phẩm
- ✅ Cập nhật thông tin sản phẩm
- ✅ Xóa sản phẩm
- ✅ Tìm kiếm sản phẩm
- ✅ Lọc sản phẩm theo loại
- ✅ Sắp xếp sản phẩm

## 📋 Product Schema

### Cấu Trúc Dữ Liệu
```javascript
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  countInStock: { 
    type: Number, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});
```

### Validation Rules
- **name**: Bắt buộc, duy nhất
- **image**: Bắt buộc (URL hoặc file path)
- **type**: Bắt buộc (Phone, Laptop, Tablet, Accessory, etc.)
- **price**: Bắt buộc, số dương
- **countInStock**: Bắt buộc, số không âm
- **rating**: Bắt buộc, từ 0 đến 5
- **description**: Bắt buộc

## 🔧 API Endpoints

### 1. **CREATE - Tạo Sản Phẩm Mới**

#### Endpoint
```
POST /api/products/create-product
```

#### Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "iPhone 15 Pro Max",
  "image": "https://example.com/iphone15.jpg",
  "type": "Phone",
  "price": 29990000,
  "countInStock": 50,
  "rating": 4.8,
  "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ"
}
```

#### Response Success
```json
{
  "status": "OK",
  "message": "Tạo sản phẩm thành công",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "iPhone 15 Pro Max",
    "image": "https://example.com/iphone15.jpg",
    "type": "Phone",
    "price": 29990000,
    "countInStock": 50,
    "rating": 4.8,
    "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Response Error
```json
{
  "status": "ERR",
  "message": "Sản phẩm đã tồn tại trong hệ thống"
}
```

### 2. **READ - Lấy Danh Sách Sản Phẩm**

#### Endpoint
```
GET /api/products/get-all
```

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | Number | No | 10 | Số sản phẩm trên mỗi trang |
| `page` | Number | No | 1 | Trang hiện tại |
| `sort` | String | No | -createdAt | Sắp xếp (price, -price, name, -name) |
| `type` | String | No | - | Lọc theo loại sản phẩm |
| `minPrice` | Number | No | - | Giá tối thiểu |
| `maxPrice` | Number | No | - | Giá tối đa |
| `rating` | Number | No | - | Đánh giá tối thiểu |

#### Example Request
```
GET /api/products/get-all?limit=5&page=1&sort=-price&type=Phone&minPrice=10000000&maxPrice=30000000&rating=4.5
```

#### Response
```json
{
  "status": "OK",
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {
      "_id": "65f1234567890abcdef12345",
      "name": "iPhone 15 Pro Max",
      "image": "https://example.com/iphone15.jpg",
      "type": "Phone",
      "price": 29990000,
      "countInStock": 50,
      "rating": 4.8,
      "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 25,
    "totalPages": 5
  }
}
```

### 3. **READ - Lấy Chi Tiết Sản Phẩm**

#### Endpoint
```
GET /api/products/get-details/:id
```

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | ID của sản phẩm |

#### Example Request
```
GET /api/products/get-details/65f1234567890abcdef12345
```

#### Response Success
```json
{
  "status": "OK",
  "message": "Lấy thông tin sản phẩm thành công",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "iPhone 15 Pro Max",
    "image": "https://example.com/iphone15.jpg",
    "type": "Phone",
    "price": 29990000,
    "countInStock": 50,
    "rating": 4.8,
    "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Response Error
```json
{
  "status": "ERR",
  "message": "Không tìm thấy sản phẩm"
}
```

### 4. **UPDATE - Cập Nhật Sản Phẩm**

#### Endpoint
```
PUT /api/products/update/:id
```

#### Headers
```
Content-Type: application/json
```

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | ID của sản phẩm |

#### Request Body
```json
{
  "name": "iPhone 15 Pro Max (Updated)",
  "image": "https://example.com/iphone15-updated.jpg",
  "type": "Phone",
  "price": 28990000,
  "countInStock": 45,
  "rating": 4.9,
  "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ - Phiên bản cập nhật"
}
```

#### Response Success
```json
{
  "status": "OK",
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "iPhone 15 Pro Max (Updated)",
    "image": "https://example.com/iphone15-updated.jpg",
    "type": "Phone",
    "price": 28990000,
    "countInStock": 45,
    "rating": 4.9,
    "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ - Phiên bản cập nhật",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 5. **DELETE - Xóa Sản Phẩm**

#### Endpoint
```
DELETE /api/products/delete/:id
```

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | ID của sản phẩm |

#### Example Request
```
DELETE /api/products/delete/65f1234567890abcdef12345
```

#### Response Success
```json
{
  "status": "OK",
  "message": "Xóa sản phẩm thành công"
}
```

### 6. **SEARCH - Tìm Kiếm Sản Phẩm**

#### Endpoint
```
GET /api/products/search
```

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | String | Yes | - | Từ khóa tìm kiếm |
| `limit` | Number | No | 10 | Số kết quả tối đa |

#### Example Request
```
GET /api/products/search?q=iPhone&limit=5
```

#### Response
```json
{
  "status": "OK",
  "message": "Tìm kiếm sản phẩm thành công",
  "data": [
    {
      "_id": "65f1234567890abcdef12345",
      "name": "iPhone 15 Pro Max",
      "image": "https://example.com/iphone15.jpg",
      "type": "Phone",
      "price": 29990000,
      "countInStock": 50,
      "rating": 4.8,
      "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 7. **FILTER - Lấy Sản Phẩm Theo Loại**

#### Endpoint
```
GET /api/products/type/:type
```

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | Yes | Loại sản phẩm |

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | Number | No | 10 | Số sản phẩm tối đa |

#### Example Request
```
GET /api/products/type/Phone?limit=5
```

#### Response
```json
{
  "status": "OK",
  "message": "Lấy sản phẩm theo loại thành công",
  "data": [
    {
      "_id": "65f1234567890abcdef12345",
      "name": "iPhone 15 Pro Max",
      "image": "https://example.com/iphone15.jpg",
      "type": "Phone",
      "price": 29990000,
      "countInStock": 50,
      "rating": 4.8,
      "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## 🏗️ Implementation Details

### 1. **Product Service Layer**

```javascript
// src/services/ProductService.js
const Product = require("../models/ProductModel");

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
    throw error;
  }
};
```

### 2. **Product Controller Layer**

```javascript
// src/controllers/ProductController.js
const ProductService = require("../services/ProductService");

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
```

### 3. **Product Routes**

```javascript
// src/routes/ProductRouter.js
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// CREATE - Tạo sản phẩm mới
router.post("/create-product", ProductController.createProduct);

// READ - Lấy tất cả sản phẩm với pagination, sorting và filtering
router.get("/get-all", ProductController.getAllProducts);

// READ - Lấy thông tin chi tiết sản phẩm theo ID
router.get("/get-details/:id", ProductController.getProductById);

// UPDATE - Cập nhật thông tin sản phẩm
router.put("/update/:id", ProductController.updateProduct);

// DELETE - Xóa sản phẩm
router.delete("/delete/:id", ProductController.deleteProduct);

// SEARCH - Tìm kiếm sản phẩm theo tên
router.get("/search", ProductController.searchProducts);

// FILTER - Lấy sản phẩm theo loại
router.get("/type/:type", ProductController.getProductsByType);

module.exports = router;
```

## 🔍 Advanced Features

### 1. **Pagination**
```javascript
const getAllProducts = async (limit, page, sort, filter) => {
  try {
    let query = Product.find();

    // Áp dụng filter
    if (filter) {
      if (filter.type) {
        query = query.where('type', filter.type);
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

    // Áp dụng sort
    if (sort) {
      query = query.sort(sort);
    } else {
      query = query.sort({ createdAt: -1 });
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
```

### 2. **Search Functionality**
```javascript
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
```

## 🧪 Testing

### 1. **Unit Tests**
```javascript
// tests/unit/ProductService.test.js
describe('ProductService', () => {
  test('should create product successfully', async () => {
    const productData = {
      name: 'Test Product',
      image: 'https://example.com/test.jpg',
      type: 'Phone',
      price: 1000000,
      countInStock: 10,
      rating: 4.5,
      description: 'Test description'
    };

    const result = await ProductService.createProduct(productData);
    expect(result.status).toBe('OK');
    expect(result.data.name).toBe(productData.name);
  });
});
```

### 2. **Integration Tests**
```javascript
// tests/integration/product.test.js
describe('Product API', () => {
  test('POST /api/products/create-product should create product', async () => {
    const response = await request(app)
      .post('/api/products/create-product')
      .send(productData)
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.data.name).toBe(productData.name);
  });
});
```

## 🚨 Error Handling

### 1. **Validation Errors**
```javascript
// Validate required fields
if (!name || !image || !type || !price || !countInStock || !rating || !description) {
  return res.status(400).json({
    status: "ERR",
    message: "Thiếu thông tin bắt buộc",
  });
}
```

### 2. **Duplicate Name Error**
```javascript
// Check for duplicate product name
const existingProduct = await Product.findOne({ name });
if (existingProduct) {
  throw new Error("Sản phẩm đã tồn tại trong hệ thống");
}
```

### 3. **Not Found Error**
```javascript
// Check if product exists
const product = await Product.findById(productId);
if (!product) {
  throw new Error("Không tìm thấy sản phẩm");
}
```

## 📊 Performance Optimization

### 1. **Database Indexing**
```javascript
// Add indexes for better performance
productSchema.index({ name: 1 });
productSchema.index({ type: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: 1 });
productSchema.index({ createdAt: -1 });
```

### 2. **Query Optimization**
```javascript
// Use lean() for read-only operations
const products = await Product.find().lean();

// Use select() to limit fields
const products = await Product.find().select('name price image').lean();
```

### 3. **Caching Strategy**
```javascript
// Implement Redis caching for frequently accessed data
const getCachedProducts = async (key) => {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const products = await Product.find().lean();
  await redis.setex(key, 3600, JSON.stringify(products));
  return products;
};
```

## 🔒 Security Considerations

### 1. **Input Validation**
```javascript
// Validate price range
if (price < 0) {
  throw new Error("Giá sản phẩm không hợp lệ");
}

// Validate rating range
if (rating < 0 || rating > 5) {
  throw new Error("Đánh giá phải từ 0 đến 5");
}
```

### 2. **SQL Injection Prevention**
```javascript
// Use Mongoose to prevent injection
const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
```

### 3. **File Upload Security**
```javascript
// Validate file types and sizes
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh'));
    }
  }
});
```

## 📚 Tài Liệu Tham Khảo

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Routing](https://expressjs.com/en/guide/routing.html)
- [MongoDB Query Operators](https://docs.mongodb.com/manual/reference/operator/query/)
- [RESTful API Design](https://restfulapi.net/)

---

**Lưu ý**: Đảm bảo test kỹ lưỡng tất cả các endpoints trước khi deploy lên production!
