# 📦 Dependencies Guide - Hướng Dẫn Thư Viện và Framework

Hướng dẫn chi tiết về tất cả các thư viện, framework và dependencies được sử dụng trong dự án E-commerce Backend.

## 🎯 Tổng Quan

Dự án sử dụng **Node.js** làm runtime environment và **Express.js** làm web framework chính. Tất cả dependencies được quản lý thông qua **npm** (Node Package Manager).

## 📋 Core Dependencies

### 🚀 **Runtime & Framework**

#### Express.js
```json
{
  "express": "^4.18.2"
}
```
- **Mô tả**: Web framework cho Node.js
- **Tác dụng**: 
  - Tạo HTTP server
  - Xử lý routing
  - Middleware support
  - RESTful API development
- **Documentation**: [expressjs.com](https://expressjs.com/)
- **Cách sử dụng**:
```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
```

#### Node.js
```json
{
  "node": ">=16.0.0"
}
```
- **Mô tả**: JavaScript runtime environment
- **Tác dụng**: 
  - Chạy JavaScript trên server
  - Event-driven, non-blocking I/O
  - Package ecosystem (npm)
- **Documentation**: [nodejs.org](https://nodejs.org/)

### 🗄️ **Database & ODM**

#### Mongoose
```json
{
  "mongoose": "^7.5.0"
}
```
- **Mô tả**: Object Data Modeling (ODM) library cho MongoDB
- **Tác dụng**:
  - Schema definition
  - Data validation
  - Query building
  - Middleware support
- **Documentation**: [mongoosejs.com](https://mongoosejs.com/)
- **Cách sử dụng**:
```javascript
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);
```

#### MongoDB
```json
{
  "mongodb": "^5.7.0"
}
```
- **Mô tả**: NoSQL database driver
- **Tác dụng**:
  - Native MongoDB operations
  - Connection management
  - Aggregation pipelines
- **Documentation**: [mongodb.com](https://docs.mongodb.com/)

### 🔐 **Authentication & Security**

#### bcrypt
```json
{
  "bcrypt": "^5.1.0"
}
```
- **Mô tả**: Password hashing library
- **Tác dụng**:
  - Hash passwords securely
  - Salt generation
  - Password verification
- **Documentation**: [npmjs.com/bcrypt](https://www.npmjs.com/package/bcrypt)
- **Cách sử dụng**:
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### jsonwebtoken (JWT)
```json
{
  "jsonwebtoken": "^9.0.2"
}
```
- **Mô tả**: JSON Web Token implementation
- **Tác dụng**:
  - Token generation
  - Token verification
  - Stateless authentication
- **Documentation**: [npmjs.com/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Cách sử dụng**:
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
const decoded = jwt.verify(token, secret);
```

### 🔧 **Development & Utilities**

#### dotenv
```json
{
  "dotenv": "^16.3.1"
}
```
- **Mô tả**: Environment variables loader
- **Tác dụng**:
  - Load environment variables từ .env file
  - Configuration management
  - Security (hide sensitive data)
- **Documentation**: [npmjs.com/dotenv](https://www.npmjs.com/package/dotenv)
- **Cách sử dụng**:
```javascript
require('dotenv').config();
const port = process.env.PORT || 3000;
```

#### cors
```json
{
  "cors": "^2.8.5"
}
```
- **Mô tả**: Cross-Origin Resource Sharing middleware
- **Tác dụng**:
  - Enable CORS
  - Configure allowed origins
  - Handle preflight requests
- **Documentation**: [npmjs.com/cors](https://www.npmjs.com/package/cors)
- **Cách sử dụng**:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### multer
```json
{
  "multer": "^1.4.5-lts.1"
}
```
- **Mô tả**: File upload middleware
- **Tác dụng**:
  - Handle multipart/form-data
  - File upload processing
  - File validation
- **Documentation**: [npmjs.com/multer](https://www.npmjs.com/package/multer)
- **Cách sử dụng**:
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle uploaded file
});
```

## 🛠️ Development Dependencies

### 🧪 **Testing**

#### Jest
```json
{
  "jest": "^29.6.2"
}
```
- **Mô tả**: JavaScript testing framework
- **Tác dụng**:
  - Unit testing
  - Integration testing
  - Mocking
  - Coverage reporting
- **Documentation**: [jestjs.io](https://jestjs.io/)
- **Cách sử dụng**:
```javascript
describe('User Service', () => {
  test('should create user', async () => {
    const user = await createUser(userData);
    expect(user.name).toBe(userData.name);
  });
});
```

#### Supertest
```json
{
  "supertest": "^6.3.3"
}
```
- **Mô tả**: HTTP assertion library
- **Tác dụng**:
  - API testing
  - HTTP request simulation
  - Response validation
- **Documentation**: [npmjs.com/supertest](https://www.npmjs.com/package/supertest)
- **Cách sử dụng**:
```javascript
const request = require('supertest');
const app = require('../app');

test('GET /api/users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);
});
```

### 🔍 **Code Quality**

#### ESLint
```json
{
  "eslint": "^8.47.0"
}
```
- **Mô tả**: JavaScript linting utility
- **Tác dụng**:
  - Code quality checking
  - Style enforcement
  - Error detection
- **Documentation**: [eslint.org](https://eslint.org/)
- **Cách sử dụng**:
```bash
# Lint code
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix
```

#### Prettier
```json
{
  "prettier": "^3.0.2"
}
```
- **Mô tả**: Code formatter
- **Tác dụng**:
  - Consistent code formatting
  - Automatic formatting
  - Integration with editors
- **Documentation**: [prettier.io](https://prettier.io/)
- **Cách sử dụng**:
```bash
# Format code
npx prettier --write src/

# Check formatting
npx prettier --check src/
```

### 🚀 **Development Tools**

#### Nodemon
```json
{
  "nodemon": "^3.0.1"
}
```
- **Mô tả**: Development server with auto-restart
- **Tác dụng**:
  - Auto-restart on file changes
  - Development workflow improvement
  - Debug mode support
- **Documentation**: [nodemon.io](https://nodemon.io/)
- **Cách sử dụng**:
```bash
# Run with nodemon
npx nodemon src/index.js

# Or add to package.json scripts
"dev": "nodemon src/index.js"
```

## 📊 Dependency Categories

### 🔴 **Production Dependencies**
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: CORS middleware
- **dotenv**: Environment variables
- **multer**: File upload

### 🟡 **Development Dependencies**
- **jest**: Testing framework
- **supertest**: API testing
- **eslint**: Code linting
- **prettier**: Code formatting
- **nodemon**: Development server

### 🟢 **Optional Dependencies**
- **helmet**: Security headers
- **compression**: Response compression
- **morgan**: HTTP request logger
- **winston**: Logging library

## 🔧 Cài Đặt và Quản Lý

### Cài Đặt Dependencies
```bash
# Cài đặt tất cả dependencies
npm install

# Cài đặt production dependencies
npm install --production

# Cài đặt development dependencies
npm install --save-dev <package-name>

# Cài đặt global package
npm install -g <package-name>
```

### Cập Nhật Dependencies
```bash
# Kiểm tra outdated packages
npm outdated

# Cập nhật tất cả packages
npm update

# Cập nhật specific package
npm update <package-name>

# Cập nhật lên version mới nhất
npm install <package-name>@latest
```

### Xóa Dependencies
```bash
# Xóa package
npm uninstall <package-name>

# Xóa và cập nhật package.json
npm uninstall <package-name> --save
```

## 📋 Scripts trong package.json

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/"
  }
}
```

## 🔍 Kiểm Tra Dependencies

### Security Audit
```bash
# Kiểm tra vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Fix vulnerabilities (force)
npm audit fix --force
```

### Dependency Tree
```bash
# Xem dependency tree
npm ls

# Xem dependency tree (depth)
npm ls --depth=2
```

## 📚 Tài Liệu Tham Khảo

- [npm Documentation](https://docs.npmjs.com/)
- [Node.js Modules](https://nodejs.org/api/modules.html)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)

## 🚨 Lưu Ý Quan Trọng

1. **Version Locking**: Luôn sử dụng `package-lock.json` để đảm bảo consistent versions
2. **Security Updates**: Thường xuyên chạy `npm audit` và cập nhật packages
3. **Dependency Size**: Kiểm tra bundle size với `npm ls --depth=0`
4. **License Compliance**: Kiểm tra licenses với `npm ls --depth=0`

---

**Lưu ý**: Luôn đọc documentation chính thức của mỗi package trước khi sử dụng!
