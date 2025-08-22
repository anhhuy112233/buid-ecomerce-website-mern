# Hướng Dẫn Test API Product với Postman

## Cài đặt và Chuẩn Bị

### 1. Cài đặt Postman
- Tải và cài đặt Postman từ: https://www.postman.com/downloads/
- Đăng ký tài khoản miễn phí (không bắt buộc)

### 2. Khởi động Server
```bash
cd backend-ecommerce-website
npm install
npm start
```

Server sẽ chạy tại: `http://localhost:8080`

## Cấu Trúc API Endpoints

Base URL: `http://localhost:8080/api/products`

### 1. CREATE - Tạo Sản Phẩm Mới
**Endpoint:** `POST /api/products/create-product`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "iPhone 15 Pro Max",
  "image": "https://example.com/iphone15.jpg",
  "type": "Phone",
  "price": 29990000,
  "countInStock": 50,
  "rating": 4.8,
  "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và màn hình 6.7 inch"
}
```

**Response thành công:**
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
    "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và màn hình 6.7 inch",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. READ - Lấy Tất Cả Sản Phẩm
**Endpoint:** `GET /api/products/get-all`

**Query Parameters:**
- `limit`: Số sản phẩm trên mỗi trang (mặc định: 10)
- `page`: Trang hiện tại (mặc định: 1)
- `sort`: Sắp xếp (ví dụ: `price` để sort theo giá tăng dần, `-price` để giảm dần)
- `type`: Lọc theo loại sản phẩm
- `minPrice`: Giá tối thiểu
- `maxPrice`: Giá tối đa
- `rating`: Đánh giá tối thiểu

**Ví dụ URL:**
```
GET http://localhost:8080/api/products/get-all?limit=5&page=1&sort=-price&type=Phone&minPrice=10000000&maxPrice=30000000&rating=4.5
```

**Response:**
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

### 3. READ - Lấy Chi Tiết Sản Phẩm
**Endpoint:** `GET /api/products/get-details/:id`

**Ví dụ:**
```
GET http://localhost:8080/api/products/get-details/65f1234567890abcdef12345
```

**Response:**
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

### 4. UPDATE - Cập Nhật Sản Phẩm
**Endpoint:** `PUT /api/products/update/:id`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
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

**Ví dụ URL:**
```
PUT http://localhost:8080/api/products/update/65f1234567890abcdef12345
```

**Response:**
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

### 5. DELETE - Xóa Sản Phẩm
**Endpoint:** `DELETE /api/products/delete/:id`

**Ví dụ:**
```
DELETE http://localhost:8080/api/products/delete/65f1234567890abcdef12345
```

**Response:**
```json
{
  "status": "OK",
  "message": "Xóa sản phẩm thành công"
}
```

### 6. SEARCH - Tìm Kiếm Sản Phẩm
**Endpoint:** `GET /api/products/search`

**Query Parameters:**
- `q`: Từ khóa tìm kiếm (bắt buộc)
- `limit`: Số kết quả tối đa (mặc định: 10)

**Ví dụ:**
```
GET http://localhost:8080/api/products/search?q=iPhone&limit=5
```

**Response:**
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

### 7. FILTER - Lấy Sản Phẩm Theo Loại
**Endpoint:** `GET /api/products/type/:type`

**Query Parameters:**
- `limit`: Số sản phẩm tối đa (mặc định: 10)

**Ví dụ:**
```
GET http://localhost:8080/api/products/type/Phone?limit=5
```

**Response:**
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

## Cách Test Trong Postman

### Bước 1: Tạo Collection
1. Mở Postman
2. Click "New" → "Collection"
3. Đặt tên: "E-commerce Product API"

### Bước 2: Tạo Environment Variables
1. Click "Environments" → "New"
2. Đặt tên: "Local Development"
3. Thêm variables:
   - `base_url`: `http://localhost:8080`
   - `product_id`: (để lưu ID sản phẩm sau khi tạo)

### Bước 3: Tạo Requests

#### Request 1: Tạo Sản Phẩm
1. Method: `POST`
2. URL: `{{base_url}}/api/products/create-product`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Samsung Galaxy S24 Ultra",
  "image": "https://example.com/samsung-s24.jpg",
  "type": "Phone",
  "price": 25990000,
  "countInStock": 30,
  "rating": 4.7,
  "description": "Samsung Galaxy S24 Ultra với S Pen tích hợp và camera 200MP"
}
```

#### Request 2: Lấy Tất Cả Sản Phẩm
1. Method: `GET`
2. URL: `{{base_url}}/api/products/get-all?limit=10&page=1`

#### Request 3: Lấy Chi Tiết Sản Phẩm
1. Method: `GET`
2. URL: `{{base_url}}/api/products/get-details/{{product_id}}`

#### Request 4: Cập Nhật Sản Phẩm
1. Method: `PUT`
2. URL: `{{base_url}}/api/products/update/{{product_id}}`
3. Body (raw JSON):
```json
{
  "name": "Samsung Galaxy S24 Ultra (Updated)",
  "image": "https://example.com/samsung-s24-updated.jpg",
  "type": "Phone",
  "price": 24990000,
  "countInStock": 25,
  "rating": 4.8,
  "description": "Samsung Galaxy S24 Ultra với S Pen tích hợp và camera 200MP - Phiên bản cập nhật"
}
```

#### Request 5: Tìm Kiếm Sản Phẩm
1. Method: `GET`
2. URL: `{{base_url}}/api/products/search?q=Samsung&limit=5`

#### Request 6: Lấy Sản Phẩm Theo Loại
1. Method: `GET`
2. URL: `{{base_url}}/api/products/type/Phone?limit=5`

#### Request 7: Xóa Sản Phẩm
1. Method: `DELETE`
2. URL: `{{base_url}}/api/products/delete/{{product_id}}`

### Bước 4: Test Scripts

#### Script để lưu Product ID sau khi tạo:
```javascript
// Thêm vào tab "Tests" của request tạo sản phẩm
if (pm.response.code === 200) {
    const responseJson = pm.response.json();
    if (responseJson.data && responseJson.data._id) {
        pm.environment.set("product_id", responseJson.data._id);
        console.log("Product ID saved:", responseJson.data._id);
    }
}
```

#### Script để kiểm tra response:
```javascript
// Thêm vào tab "Tests" của các requests
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.have.property('status');
    pm.expect(responseJson).to.have.property('message');
});
```

## Dữ Liệu Test Mẫu

### Tạo nhiều sản phẩm để test:

```json
{
  "name": "MacBook Pro M3",
  "image": "https://example.com/macbook-pro.jpg",
  "type": "Laptop",
  "price": 45990000,
  "countInStock": 20,
  "rating": 4.9,
  "description": "MacBook Pro với chip M3 mạnh mẽ, màn hình 14 inch"
}
```

```json
{
  "name": "iPad Pro 12.9",
  "image": "https://example.com/ipad-pro.jpg",
  "type": "Tablet",
  "price": 32990000,
  "countInStock": 15,
  "rating": 4.8,
  "description": "iPad Pro 12.9 inch với chip M2 và Apple Pencil"
}
```

```json
{
  "name": "AirPods Pro 2",
  "image": "https://example.com/airpods-pro.jpg",
  "type": "Accessory",
  "price": 5990000,
  "countInStock": 100,
  "rating": 4.6,
  "description": "AirPods Pro 2 với chống ồn chủ động và âm thanh không gian"
}
```

## Lưu Ý Quan Trọng

1. **Validation**: API sẽ kiểm tra tất cả các trường bắt buộc
2. **Unique Name**: Tên sản phẩm phải là duy nhất
3. **Error Handling**: Tất cả lỗi sẽ trả về status code phù hợp
4. **Pagination**: Sử dụng limit và page để phân trang
5. **Sorting**: Có thể sort theo bất kỳ trường nào
6. **Filtering**: Hỗ trợ filter theo type, price range, rating

## Troubleshooting

### Lỗi thường gặp:

1. **500 Internal Server Error**: Kiểm tra MongoDB connection
2. **400 Bad Request**: Kiểm tra dữ liệu đầu vào
3. **404 Not Found**: Kiểm tra URL endpoint
4. **Validation Error**: Kiểm tra các trường bắt buộc

### Debug:
- Kiểm tra console của server
- Sử dụng Postman Console để xem logs
- Kiểm tra MongoDB connection string
