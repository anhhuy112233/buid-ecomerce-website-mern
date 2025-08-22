# 🧪 API Testing Guide - Hướng Dẫn Test API

Hướng dẫn chi tiết cách test API trong dự án E-commerce Backend sử dụng Postman và các công cụ khác.

## 🎯 Tổng Quan

Testing API là một phần quan trọng trong quá trình phát triển để đảm bảo:
- ✅ API hoạt động đúng như thiết kế
- ✅ Xử lý lỗi chính xác
- ✅ Performance đáp ứng yêu cầu
- ✅ Security không bị lỗ hổng

## 🛠️ Công Cụ Test

### 1. **Postman** (Khuyến nghị)
- **Tải về**: [postman.com](https://www.postman.com/downloads/)
- **Ưu điểm**: GUI friendly, có thể lưu collections, environment variables
- **Phù hợp**: Manual testing, API documentation

### 2. **Insomnia**
- **Tải về**: [insomnia.rest](https://insomnia.rest/download)
- **Ưu điểm**: Lightweight, fast, good for REST APIs
- **Phù hợp**: Development testing

### 3. **cURL** (Command Line)
- **Có sẵn**: Trên hầu hết hệ điều hành
- **Ưu điểm**: Scriptable, automation friendly
- **Phù hợp**: Automation, CI/CD

### 4. **Jest + Supertest** (Automated Testing)
- **Cài đặt**: `npm install --save-dev jest supertest`
- **Ưu điểm**: Automated testing, CI/CD integration
- **Phù hợp**: Unit testing, integration testing

## 📋 Test Cases Checklist

### 🔍 **Functional Testing**
- [ ] Tất cả endpoints hoạt động đúng
- [ ] Request/Response format đúng
- [ ] Status codes chính xác
- [ ] Data validation hoạt động
- [ ] Error handling đúng

### 🔒 **Security Testing**
- [ ] Authentication required cho protected routes
- [ ] Authorization đúng role
- [ ] Input validation chống injection
- [ ] Rate limiting hoạt động
- [ ] CORS configuration đúng

### ⚡ **Performance Testing**
- [ ] Response time < 2s
- [ ] Handle concurrent requests
- [ ] Memory usage ổn định
- [ ] Database queries optimized

## 🚀 Setup Postman

### 1. **Import Collection**
```bash
# Tải file collection
E-commerce_Product_API.postman_collection.json

# Import vào Postman
File → Import → Chọn file collection
```

### 2. **Setup Environment**
```bash
# Tải file environment
Local_Development.postman_environment.json

# Import vào Postman
File → Import → Chọn file environment
```

### 3. **Environment Variables**
```json
{
  "base_url": "http://localhost:8080",
  "product_id": "",
  "user_token": "",
  "admin_token": ""
}
```

## 📝 Test Cases Chi Tiết

### 1. **Product API Testing**

#### ✅ **CREATE Product**
```http
POST {{base_url}}/api/products/create-product
Content-Type: application/json

{
  "name": "Test Product",
  "image": "https://example.com/test.jpg",
  "type": "Phone",
  "price": 1000000,
  "countInStock": 10,
  "rating": 4.5,
  "description": "Test product description"
}
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Tạo sản phẩm thành công",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "Test Product",
    "image": "https://example.com/test.jpg",
    "type": "Phone",
    "price": 1000000,
    "countInStock": 10,
    "rating": 4.5,
    "description": "Test product description",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Test Script:**
```javascript
// Save product ID for later tests
if (pm.response.code === 200) {
    const responseJson = pm.response.json();
    if (responseJson.data && responseJson.data._id) {
        pm.environment.set("product_id", responseJson.data._id);
        console.log("Product ID saved:", responseJson.data._id);
    }
}

// Validate response structure
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.have.property('status');
    pm.expect(responseJson).to.have.property('message');
    pm.expect(responseJson).to.have.property('data');
    pm.expect(responseJson.status).to.eql('OK');
});

pm.test("Product data is correct", function () {
    const responseJson = pm.response.json();
    const product = responseJson.data;
    pm.expect(product.name).to.eql('Test Product');
    pm.expect(product.price).to.eql(1000000);
    pm.expect(product.type).to.eql('Phone');
});
```

#### ✅ **GET All Products**
```http
GET {{base_url}}/api/products/get-all?limit=5&page=1&sort=-price
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {
      "_id": "65f1234567890abcdef12345",
      "name": "Test Product",
      "image": "https://example.com/test.jpg",
      "type": "Phone",
      "price": 1000000,
      "countInStock": 10,
      "rating": 4.5,
      "description": "Test product description",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1
  }
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has pagination", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.have.property('pagination');
    pm.expect(responseJson.pagination).to.have.property('page');
    pm.expect(responseJson.pagination).to.have.property('total');
});

pm.test("Products array is not empty", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.data).to.be.an('array');
    pm.expect(responseJson.data.length).to.be.greaterThan(0);
});
```

#### ✅ **GET Product by ID**
```http
GET {{base_url}}/api/products/get-details/{{product_id}}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product ID matches", function () {
    const responseJson = pm.response.json();
    const productId = pm.environment.get("product_id");
    pm.expect(responseJson.data._id).to.eql(productId);
});
```

#### ✅ **UPDATE Product**
```http
PUT {{base_url}}/api/products/update/{{product_id}}
Content-Type: application/json

{
  "name": "Updated Test Product",
  "image": "https://example.com/updated-test.jpg",
  "type": "Phone",
  "price": 1200000,
  "countInStock": 15,
  "rating": 4.8,
  "description": "Updated test product description"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product is updated", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.data.name).to.eql('Updated Test Product');
    pm.expect(responseJson.data.price).to.eql(1200000);
});
```

#### ✅ **DELETE Product**
```http
DELETE {{base_url}}/api/products/delete/{{product_id}}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product is deleted", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.status).to.eql('OK');
    pm.expect(responseJson.message).to.include('Xóa sản phẩm thành công');
});
```

### 2. **Error Handling Testing**

#### ❌ **Invalid Input**
```http
POST {{base_url}}/api/products/create-product
Content-Type: application/json

{
  "name": "",
  "price": -1000
}
```

**Expected Response:**
```json
{
  "status": "ERR",
  "message": "Thiếu thông tin bắt buộc"
}
```

**Test Script:**
```javascript
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Error message is correct", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.status).to.eql('ERR');
});
```

#### ❌ **Duplicate Product**
```http
POST {{base_url}}/api/products/create-product
Content-Type: application/json

{
  "name": "Test Product",
  "image": "https://example.com/test.jpg",
  "type": "Phone",
  "price": 1000000,
  "countInStock": 10,
  "rating": 4.5,
  "description": "Test product description"
}
```

**Expected Response:**
```json
{
  "status": "ERR",
  "message": "Sản phẩm đã tồn tại trong hệ thống"
}
```

#### ❌ **Product Not Found**
```http
GET {{base_url}}/api/products/get-details/invalid-id
```

**Expected Response:**
```json
{
  "status": "ERR",
  "message": "Không tìm thấy sản phẩm"
}
```

## 🔧 Automated Testing với Jest

### 1. **Setup Jest**
```bash
npm install --save-dev jest supertest
```

### 2. **Test Configuration**
```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"]
  }
}
```

### 3. **Test Setup**
```javascript
// tests/setup.js
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
```

### 4. **Product API Tests**
```javascript
// tests/api/product.test.js
const request = require('supertest');
const app = require('../../src/app');
const Product = require('../../src/models/ProductModel');

describe('Product API', () => {
  let testProduct;

  beforeEach(async () => {
    testProduct = new Product({
      name: 'Test Product',
      image: 'https://example.com/test.jpg',
      type: 'Phone',
      price: 1000000,
      countInStock: 10,
      rating: 4.5,
      description: 'Test description'
    });
    await testProduct.save();
  });

  describe('POST /api/products/create-product', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        image: 'https://example.com/new.jpg',
        type: 'Laptop',
        price: 2000000,
        countInStock: 5,
        rating: 4.8,
        description: 'New product description'
      };

      const response = await request(app)
        .post('/api/products/create-product')
        .send(productData)
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data.name).toBe(productData.name);
      expect(response.body.data.price).toBe(productData.price);
    });

    it('should return error for duplicate product name', async () => {
      const productData = {
        name: 'Test Product', // Duplicate name
        image: 'https://example.com/test2.jpg',
        type: 'Phone',
        price: 1000000,
        countInStock: 10,
        rating: 4.5,
        description: 'Test description'
      };

      const response = await request(app)
        .post('/api/products/create-product')
        .send(productData)
        .expect(500);

      expect(response.body.status).toBe('ERR');
      expect(response.body.message).toContain('đã tồn tại');
    });

    it('should return error for missing required fields', async () => {
      const productData = {
        name: 'Incomplete Product'
        // Missing other required fields
      };

      const response = await request(app)
        .post('/api/products/create-product')
        .send(productData)
        .expect(400);

      expect(response.body.status).toBe('ERR');
      expect(response.body.message).toContain('Thiếu thông tin bắt buộc');
    });
  });

  describe('GET /api/products/get-all', () => {
    it('should return all products with pagination', async () => {
      const response = await request(app)
        .get('/api/products/get-all?limit=10&page=1')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
    });

    it('should filter products by type', async () => {
      const response = await request(app)
        .get('/api/products/get-all?type=Phone')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data.every(p => p.type === 'Phone')).toBe(true);
    });

    it('should sort products by price', async () => {
      const response = await request(app)
        .get('/api/products/get-all?sort=-price')
        .expect(200);

      expect(response.body.status).toBe('OK');
      const prices = response.body.data.map(p => p.price);
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });

  describe('GET /api/products/get-details/:id', () => {
    it('should return product by ID', async () => {
      const response = await request(app)
        .get(`/api/products/get-details/${testProduct._id}`)
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data._id).toBe(testProduct._id.toString());
    });

    it('should return error for invalid ID', async () => {
      const response = await request(app)
        .get('/api/products/get-details/invalid-id')
        .expect(500);

      expect(response.body.status).toBe('ERR');
      expect(response.body.message).toContain('Không tìm thấy sản phẩm');
    });
  });

  describe('PUT /api/products/update/:id', () => {
    it('should update product', async () => {
      const updateData = {
        name: 'Updated Product',
        image: 'https://example.com/updated.jpg',
        type: 'Phone',
        price: 1500000,
        countInStock: 20,
        rating: 4.9,
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/products/update/${testProduct._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.price).toBe(updateData.price);
    });
  });

  describe('DELETE /api/products/delete/:id', () => {
    it('should delete product', async () => {
      const response = await request(app)
        .delete(`/api/products/delete/${testProduct._id}`)
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toContain('Xóa sản phẩm thành công');

      // Verify product is deleted
      const deletedProduct = await Product.findById(testProduct._id);
      expect(deletedProduct).toBeNull();
    });
  });

  describe('GET /api/products/search', () => {
    it('should search products by name', async () => {
      const response = await request(app)
        .get('/api/products/search?q=Test')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.data.every(p => 
        p.name.toLowerCase().includes('test')
      )).toBe(true);
    });
  });
});
```

## 🔍 Performance Testing

### 1. **Load Testing với Artillery**
```bash
npm install -g artillery
```

```yaml
# load-test.yml
config:
  target: 'http://localhost:8080'
  phases:
    - duration: 60
      arrivalRate: 10
  defaults:
    headers:
      Content-Type: 'application/json'

scenarios:
  - name: "Product API Load Test"
    requests:
      - get:
          url: "/api/products/get-all"
      - post:
          url: "/api/products/create-product"
          json:
            name: "Load Test Product"
            image: "https://example.com/load-test.jpg"
            type: "Phone"
            price: 1000000
            countInStock: 10
            rating: 4.5
            description: "Load test product"
```

```bash
artillery run load-test.yml
```

### 2. **Stress Testing**
```yaml
# stress-test.yml
config:
  target: 'http://localhost:8080'
  phases:
    - duration: 30
      arrivalRate: 5
    - duration: 30
      arrivalRate: 20
    - duration: 30
      arrivalRate: 50
```

## 📊 Test Reports

### 1. **Jest Coverage Report**
```bash
npm run test:coverage
```

### 2. **Postman Test Results**
- Export test results
- Generate HTML reports
- Share with team

### 3. **Performance Metrics**
- Response time
- Throughput
- Error rate
- Resource usage

## 🚨 Common Issues & Solutions

### 1. **CORS Errors**
```javascript
// Add CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### 2. **Authentication Issues**
```javascript
// Add auth header
pm.request.headers.add({
  key: 'Authorization',
  value: 'Bearer {{user_token}}'
});
```

### 3. **Database Connection Issues**
```javascript
// Check MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
```

## 📚 Best Practices

### 1. **Test Organization**
- Group related tests
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. **Data Management**
- Use test databases
- Clean up after tests
- Use fixtures for test data

### 3. **Error Handling**
- Test both success and failure cases
- Validate error messages
- Check status codes

### 4. **Performance**
- Monitor response times
- Test with realistic data
- Use appropriate timeouts

## 🔗 Useful Links

- [Postman Learning Center](https://learning.postman.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Artillery Documentation](https://www.artillery.io/docs)

---

**Lưu ý**: Luôn test kỹ lưỡng trước khi deploy và maintain test suite thường xuyên!
