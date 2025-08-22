# 📁 Project Structure - Cấu Trúc Dự Án

Hướng dẫn chi tiết về cấu trúc thư mục và file trong dự án E-commerce Backend.

## 🎯 Tổng Quan

Dự án được tổ chức theo mô hình **MVC (Model-View-Controller)** với kiến trúc **layered architecture** để đảm bảo tính bảo trì và mở rộng.

## 📂 Cấu Trúc Thư Mục

```
backend-ecommerce-website/
├── 📁 src/                          # Source code chính
│   ├── 📁 config/                   # Cấu hình
│   ├── 📁 controllers/              # Controllers (Business Logic)
│   ├── 📁 middleware/               # Custom Middleware
│   ├── 📁 models/                   # Database Models
│   ├── 📁 routes/                   # API Routes
│   ├── 📁 services/                 # Business Services
│   ├── 📁 uploads/                  # Uploaded Files
│   ├── 📁 utils/                    # Utility Functions
│   └── 📄 index.js                  # Entry Point
├── 📁 docs/                         # Documentation
├── 📁 tests/                        # Test Files
├── 📄 .env                          # Environment Variables
├── 📄 .env.example                  # Environment Template
├── 📄 .gitignore                    # Git Ignore Rules
├── 📄 package.json                  # Dependencies & Scripts
├── 📄 package-lock.json             # Locked Dependencies
└── 📄 README.md                     # Project README
```

## 🔍 Chi Tiết Từng Thư Mục

### 📁 `src/` - Source Code Chính

#### 📁 `config/` - Cấu Hình
```
config/
├── 📄 db.js                         # Database configuration
├── 📄 jwt.js                        # JWT configuration
└── 📄 multer.js                     # File upload configuration
```

**Mục đích**: Chứa tất cả cấu hình của ứng dụng
- **db.js**: Cấu hình kết nối MongoDB
- **jwt.js**: Cấu hình JWT tokens
- **multer.js**: Cấu hình file upload

#### 📁 `controllers/` - Controllers
```
controllers/
├── 📄 ProductController.js          # Product CRUD operations
├── 📄 UserController.js             # User CRUD operations
└── 📄 OrderController.js            # Order CRUD operations
```

**Mục đích**: Xử lý HTTP requests và responses
- Nhận request từ routes
- Validate input data
- Gọi services để xử lý business logic
- Trả về response cho client

**Ví dụ**:
```javascript
// ProductController.js
const createProduct = async (req, res) => {
  try {
    const result = await ProductService.createProduct(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message
    });
  }
};
```

#### 📁 `middleware/` - Custom Middleware
```
middleware/
├── 📄 authMiddleware.js             # Authentication middleware
├── 📄 errorMiddleware.js            # Error handling middleware
└── 📄 validationMiddleware.js       # Input validation middleware
```

**Mục đích**: Xử lý các tác vụ trung gian
- **authMiddleware.js**: Xác thực JWT tokens
- **errorMiddleware.js**: Xử lý lỗi global
- **validationMiddleware.js**: Validate input data

**Ví dụ**:
```javascript
// authMiddleware.js
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

#### 📁 `models/` - Database Models
```
models/
├── 📄 ProductModel.js               # Product schema
├── 📄 UserModel.js                  # User schema
├── 📄 OrderModel.js                 # Order schema
└── 📄 OrderProduct.js               # Order-Product relationship
```

**Mục đích**: Định nghĩa database schemas
- Sử dụng Mongoose để định nghĩa schemas
- Validation rules
- Indexes và relationships

**Ví dụ**:
```javascript
// ProductModel.js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // ... other fields
}, {
  timestamps: true
});
```

#### 📁 `routes/` - API Routes
```
routes/
├── 📄 index.js                      # Main router
├── 📄 ProductRouter.js              # Product routes
├── 📄 UserRouter.js                 # User routes
└── 📄 OrderRouter.js                # Order routes
```

**Mục đích**: Định nghĩa API endpoints
- URL patterns
- HTTP methods
- Controller mapping

**Ví dụ**:
```javascript
// ProductRouter.js
router.post('/create-product', ProductController.createProduct);
router.get('/get-all', ProductController.getAllProducts);
router.get('/get-details/:id', ProductController.getProductById);
router.put('/update/:id', ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
```

#### 📁 `services/` - Business Services
```
services/
├── 📄 ProductService.js             # Product business logic
├── 📄 UserService.js                # User business logic
├── 📄 JwtService.js                 # JWT operations
└── 📄 EmailService.js               # Email operations
```

**Mục đích**: Chứa business logic
- Xử lý nghiệp vụ phức tạp
- Database operations
- External API calls

**Ví dụ**:
```javascript
// ProductService.js
const createProduct = async (productData) => {
  try {
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
      throw new Error("Product already exists");
    }
    
    const newProduct = new Product(productData);
    await newProduct.save();
    
    return {
      status: "OK",
      message: "Product created successfully",
      data: newProduct
    };
  } catch (error) {
    throw error;
  }
};
```

#### 📁 `uploads/` - Uploaded Files
```
uploads/
├── 📁 images/                       # Product images
├── 📁 avatars/                      # User avatars
└── 📁 documents/                    # Other documents
```

**Mục đích**: Lưu trữ files được upload
- Product images
- User avatars
- Documents

#### 📁 `utils/` - Utility Functions
```
utils/
├── 📄 logger.js                     # Logging utility
├── 📄 validator.js                  # Validation utility
├── 📄 helper.js                     # Helper functions
└── 📄 constants.js                  # Constants
```

**Mục đích**: Các hàm tiện ích
- Logging functions
- Validation helpers
- Common utilities

### 📁 `docs/` - Documentation
```
docs/
├── 📄 README.md                     # Main documentation
├── 📄 installation-guide.md         # Installation guide
├── 📄 dependencies-guide.md         # Dependencies guide
├── 📄 project-structure.md          # This file
├── 📁 features/                     # Feature documentation
├── 📁 testing/                      # Testing documentation
├── 📁 deployment/                   # Deployment documentation
└── 📁 maintenance/                  # Maintenance documentation
```

### 📁 `tests/` - Test Files
```
tests/
├── 📁 unit/                         # Unit tests
├── 📁 integration/                  # Integration tests
├── 📁 api/                          # API tests
└── 📄 setup.js                      # Test setup
```

## 🔄 Luồng Dữ Liệu

### 1. **Request Flow**
```
Client Request → Routes → Middleware → Controller → Service → Model → Database
```

### 2. **Response Flow**
```
Database → Model → Service → Controller → Middleware → Routes → Client Response
```

### 3. **Error Flow**
```
Error → Service → Controller → Error Middleware → Client Error Response
```

## 📋 File Quan Trọng

### 📄 `src/index.js` - Entry Point
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/ProductRouter'));
app.use('/api/users', require('./routes/UserRouter'));

// Error handling
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 📄 `package.json` - Project Configuration
```json
{
  "name": "ecommerce-backend",
  "version": "1.0.0",
  "description": "E-commerce Backend API",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.2"
  }
}
```

### 📄 `.env` - Environment Variables
```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce_db

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🏗️ Kiến Trúc Patterns

### 1. **MVC Pattern**
- **Model**: Database schemas và data access
- **View**: API responses (JSON)
- **Controller**: Request handling và business logic coordination

### 2. **Service Layer Pattern**
- Tách business logic khỏi controllers
- Reusable business operations
- Easier testing và maintenance

### 3. **Middleware Pattern**
- Modular request processing
- Cross-cutting concerns
- Authentication, logging, validation

### 4. **Repository Pattern** (Có thể mở rộng)
- Abstract data access layer
- Database agnostic
- Easier testing

## 🔧 Best Practices

### 1. **File Naming**
- Use PascalCase for models: `UserModel.js`
- Use camelCase for controllers: `userController.js`
- Use kebab-case for routes: `user-router.js`

### 2. **Import/Export**
```javascript
// Use named exports
export const createUser = async (userData) => { ... };
export const getUserById = async (id) => { ... };

// Use default exports for main modules
export default router;
```

### 3. **Error Handling**
```javascript
// Consistent error format
const errorResponse = {
  status: "ERR",
  message: error.message,
  timestamp: new Date().toISOString()
};
```

### 4. **Configuration Management**
```javascript
// Centralized configuration
const config = {
  database: {
    uri: process.env.MONGODB_URI,
    options: { useNewUrlParser: true }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};
```

## 📈 Scalability Considerations

### 1. **Modular Structure**
- Easy to add new features
- Independent modules
- Clear separation of concerns

### 2. **Configuration Management**
- Environment-based configuration
- Centralized settings
- Easy deployment

### 3. **Error Handling**
- Global error handling
- Consistent error responses
- Proper logging

### 4. **Testing Structure**
- Unit tests for services
- Integration tests for APIs
- Separate test environment

## 🚀 Deployment Structure

### Development
```
src/
├── 📁 config/
├── 📁 controllers/
├── 📁 middleware/
├── 📁 models/
├── 📁 routes/
├── 📁 services/
└── 📄 index.js
```

### Production
```
dist/                    # Compiled code
├── 📁 config/
├── 📁 controllers/
├── 📁 middleware/
├── 📁 models/
├── 📁 routes/
├── 📁 services/
└── 📄 index.js
```

---

**Lưu ý**: Cấu trúc này được thiết kế để dễ bảo trì và mở rộng. Hãy tuân thủ các conventions để đảm bảo tính nhất quán!
