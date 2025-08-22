# Product API - Hướng Dẫn Sử Dụng

## Tổng Quan

API Product cung cấp đầy đủ các chức năng CRUD (Create, Read, Update, Delete) cho quản lý sản phẩm trong hệ thống e-commerce.

## Cài Đặt và Chạy

### 1. Cài đặt dependencies
```bash
cd backend-ecommerce-website
npm install
```

### 2. Cấu hình MongoDB
Đảm bảo MongoDB đã được cài đặt và chạy. Kiểm tra file `src/config/db.js` để cấu hình connection string.

### 3. Khởi động server
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:8080`

## API Endpoints

### Base URL
```
http://localhost:8080/api/products
```

### 1. CREATE - Tạo Sản Phẩm
- **Method:** `POST`
- **Endpoint:** `/create-product`
- **Description:** Tạo sản phẩm mới
- **Body Required:** `name`, `image`, `type`, `price`, `countInStock`, `rating`, `description`

### 2. READ - Lấy Danh Sách Sản Phẩm
- **Method:** `GET`
- **Endpoint:** `/get-all`
- **Description:** Lấy tất cả sản phẩm với pagination, sorting và filtering
- **Query Parameters:**
  - `limit`: Số sản phẩm trên mỗi trang (default: 10)
  - `page`: Trang hiện tại (default: 1)
  - `sort`: Sắp xếp (ví dụ: `price`, `-price`, `name`, `-name`)
  - `type`: Lọc theo loại sản phẩm
  - `minPrice`: Giá tối thiểu
  - `maxPrice`: Giá tối đa
  - `rating`: Đánh giá tối thiểu

### 3. READ - Lấy Chi Tiết Sản Phẩm
- **Method:** `GET`
- **Endpoint:** `/get-details/:id`
- **Description:** Lấy thông tin chi tiết sản phẩm theo ID

### 4. UPDATE - Cập Nhật Sản Phẩm
- **Method:** `PUT`
- **Endpoint:** `/update/:id`
- **Description:** Cập nhật thông tin sản phẩm
- **Body Required:** `name`, `image`, `type`, `price`, `countInStock`, `rating`, `description`

### 5. DELETE - Xóa Sản Phẩm
- **Method:** `DELETE`
- **Endpoint:** `/delete/:id`
- **Description:** Xóa sản phẩm theo ID

### 6. SEARCH - Tìm Kiếm Sản Phẩm
- **Method:** `GET`
- **Endpoint:** `/search`
- **Description:** Tìm kiếm sản phẩm theo tên
- **Query Parameters:**
  - `q`: Từ khóa tìm kiếm (required)
  - `limit`: Số kết quả tối đa (default: 10)

### 7. FILTER - Lấy Sản Phẩm Theo Loại
- **Method:** `GET`
- **Endpoint:** `/type/:type`
- **Description:** Lấy sản phẩm theo loại
- **Query Parameters:**
  - `limit`: Số sản phẩm tối đa (default: 10)

## Cấu Trúc Dữ Liệu

### Product Schema
```javascript
{
  name: String (required, unique),
  image: String (required),
  type: String (required),
  price: Number (required),
  countInStock: Number (required),
  rating: Number (required),
  description: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Response Format
```javascript
{
  status: "OK" | "ERR",
  message: String,
  data: Object | Array,
  pagination?: {
    page: Number,
    limit: Number,
    total: Number,
    totalPages: Number
  }
}
```

## Ví Dụ Sử Dụng

### Tạo sản phẩm mới
```bash
curl -X POST http://localhost:8080/api/products/create-product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro Max",
    "image": "https://example.com/iphone15.jpg",
    "type": "Phone",
    "price": 29990000,
    "countInStock": 50,
    "rating": 4.8,
    "description": "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ"
  }'
```

### Lấy danh sách sản phẩm với filter
```bash
curl "http://localhost:8080/api/products/get-all?limit=5&page=1&sort=-price&type=Phone&minPrice=10000000&maxPrice=30000000&rating=4.5"
```

### Tìm kiếm sản phẩm
```bash
curl "http://localhost:8080/api/products/search?q=iPhone&limit=5"
```

## Test với Postman

### Import Collection
1. Mở Postman
2. Click "Import"
3. Chọn file `E-commerce_Product_API.postman_collection.json`

### Import Environment
1. Click "Import"
2. Chọn file `Local_Development.postman_environment.json`
3. Chọn environment "Local Development"

### Chạy Test
1. Chọn environment "Local Development"
2. Chạy request "CREATE - Tạo Sản Phẩm" trước
3. Product ID sẽ được tự động lưu vào environment
4. Chạy các request khác theo thứ tự

## Error Handling

### HTTP Status Codes
- `200`: Thành công
- `400`: Bad Request - Dữ liệu đầu vào không hợp lệ
- `404`: Not Found - Không tìm thấy sản phẩm
- `500`: Internal Server Error - Lỗi server

### Error Response Format
```javascript
{
  status: "ERR",
  message: "Mô tả lỗi"
}
```

## Validation Rules

### Tạo và Cập nhật sản phẩm
- Tất cả các trường đều bắt buộc
- `name` phải là duy nhất
- `price`, `countInStock`, `rating` phải là số
- `rating` phải từ 0 đến 5

### Query Parameters
- `limit` và `page` phải là số dương
- `minPrice` và `maxPrice` phải là số
- `rating` phải từ 0 đến 5

## Performance Tips

1. **Pagination**: Luôn sử dụng `limit` để giới hạn số lượng kết quả
2. **Indexing**: Đảm bảo MongoDB có index cho các trường thường query
3. **Caching**: Có thể implement Redis cache cho các query phổ biến
4. **Filtering**: Sử dụng filter để giảm số lượng dữ liệu trả về

## Security Considerations

1. **Input Validation**: Tất cả input đều được validate
2. **SQL Injection**: Sử dụng Mongoose để tránh injection
3. **Rate Limiting**: Có thể implement rate limiting cho API
4. **Authentication**: Có thể thêm middleware authentication

## Monitoring và Logging

1. **Error Logging**: Tất cả lỗi đều được log
2. **Performance Monitoring**: Có thể thêm middleware để monitor performance
3. **Request Logging**: Có thể thêm middleware để log tất cả requests

## Troubleshooting

### Lỗi thường gặp

1. **MongoDB Connection Error**
   - Kiểm tra MongoDB service
   - Kiểm tra connection string

2. **Validation Error**
   - Kiểm tra dữ liệu đầu vào
   - Đảm bảo tất cả trường bắt buộc đều có

3. **Duplicate Key Error**
   - Tên sản phẩm đã tồn tại
   - Thay đổi tên sản phẩm

4. **Port Already in Use**
   - Thay đổi port trong config
   - Kill process đang sử dụng port

### Debug
```bash
# Xem logs
npm start

# Test connection
curl http://localhost:8080/api/products/get-all
```

## Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License
