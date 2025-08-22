# 🚀 Installation Guide - Hướng Dẫn Cài Đặt

Hướng dẫn chi tiết cách cài đặt và setup dự án E-commerce Backend từ đầu.

## 📋 Yêu Cầu Hệ Thống

### Hệ Điều Hành
- **Windows**: Windows 10/11 (64-bit)
- **macOS**: macOS 10.15 (Catalina) trở lên
- **Linux**: Ubuntu 18.04+, CentOS 7+, hoặc tương đương

### Phần Mềm Bắt Buộc

#### 1. Node.js
- **Phiên bản**: 16.x trở lên (Khuyến nghị: 18.x LTS)
- **Tải về**: [nodejs.org](https://nodejs.org/)
- **Kiểm tra**: `node --version`

#### 2. npm (Node Package Manager)
- **Phiên bản**: 8.x trở lên
- **Đi kèm với Node.js**
- **Kiểm tra**: `npm --version`

#### 3. MongoDB
- **Phiên bản**: 5.0 trở lên
- **Tải về**: [mongodb.com](https://www.mongodb.com/try/download/community)
- **Hoặc sử dụng MongoDB Atlas** (Cloud)

#### 4. Git
- **Phiên bản**: 2.x trở lên
- **Tải về**: [git-scm.com](https://git-scm.com/)
- **Kiểm tra**: `git --version`

## 🔧 Cài Đặt Chi Tiết

### Bước 1: Cài Đặt Node.js

#### Windows
```bash
# Tải và cài đặt từ nodejs.org
# Hoặc sử dụng Chocolatey
choco install nodejs

# Hoặc sử dụng Scoop
scoop install nodejs
```

#### macOS
```bash
# Sử dụng Homebrew
brew install node

# Hoặc tải từ nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
# Cập nhật package list
sudo apt update

# Cài đặt Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Hoặc sử dụng Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### Bước 2: Cài Đặt MongoDB

#### Windows
```bash
# Tải MongoDB Community Server từ mongodb.com
# Cài đặt và thêm vào PATH
# Hoặc sử dụng Chocolatey
choco install mongodb
```

#### macOS
```bash
# Sử dụng Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Khởi động MongoDB
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu)
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Tạo file list cho MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Cập nhật package database
sudo apt-get update

# Cài đặt MongoDB
sudo apt-get install -y mongodb-org

# Khởi động MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Bước 3: Cài Đặt Git

#### Windows
```bash
# Tải từ git-scm.com
# Hoặc sử dụng Chocolatey
choco install git
```

#### macOS
```bash
# Sử dụng Homebrew
brew install git

# Hoặc cài đặt Xcode Command Line Tools
xcode-select --install
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

## 📦 Clone và Setup Dự Án

### Bước 1: Clone Repository
```bash
# Clone dự án
git clone <repository-url>
cd backend-ecommerce-website

# Hoặc nếu bạn đã có code local
cd backend-ecommerce-website
```

### Bước 2: Cài Đặt Dependencies
```bash
# Cài đặt tất cả dependencies
npm install

# Hoặc sử dụng yarn (nếu có)
yarn install
```

### Bước 3: Cấu Hình Environment
```bash
# Tạo file .env từ template
cp .env.example .env

# Chỉnh sửa file .env với thông tin của bạn
nano .env
# hoặc
code .env
```

### Bước 4: Khởi Tạo Database
```bash
# Kết nối MongoDB
mongosh

# Tạo database (nếu cần)
use ecommerce_db

# Thoát MongoDB shell
exit
```

### Bước 5: Chạy Dự Án
```bash
# Chế độ development
npm run dev

# Hoặc chế độ production
npm start

# Hoặc với nodemon (auto restart)
npm run dev:watch
```

## 🔍 Kiểm Tra Cài Đặt

### Kiểm Tra Node.js
```bash
node --version
# Kết quả mong đợi: v18.x.x

npm --version
# Kết quả mong đợi: 8.x.x
```

### Kiểm Tra MongoDB
```bash
# Kiểm tra MongoDB service
mongosh --eval "db.runCommand('ping')"
# Kết quả mong đợi: { ok: 1 }
```

### Kiểm Tra Dự Án
```bash
# Chạy test
npm test

# Kiểm tra API
curl http://localhost:8080/api/health
# Kết quả mong đợi: {"status":"OK","message":"Server is running"}
```

## 🛠️ Cài Đặt Bổ Sung (Tùy Chọn)

### 1. PM2 (Process Manager)
```bash
# Cài đặt PM2 globally
npm install -g pm2

# Chạy ứng dụng với PM2
pm2 start src/index.js --name "ecommerce-backend"
pm2 save
pm2 startup
```

### 2. Nodemon (Development)
```bash
# Cài đặt nodemon globally
npm install -g nodemon

# Chạy với nodemon
nodemon src/index.js
```

### 3. MongoDB Compass (GUI)
```bash
# Tải từ mongodb.com/try/download/compass
# Hoặc sử dụng package manager
```

## 🚨 Troubleshooting

### Lỗi Node.js
```bash
# Kiểm tra version
node --version

# Nếu version cũ, cập nhật
nvm install 18
nvm use 18
```

### Lỗi MongoDB
```bash
# Kiểm tra service
sudo systemctl status mongod

# Khởi động lại service
sudo systemctl restart mongod

# Kiểm tra logs
sudo journalctl -u mongod
```

### Lỗi Port
```bash
# Kiểm tra port đang sử dụng
netstat -tulpn | grep :8080

# Kill process nếu cần
sudo kill -9 <PID>
```

### Lỗi Dependencies
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

## 📚 Tài Liệu Tham Khảo

- [Node.js Installation](https://nodejs.org/en/download/)
- [MongoDB Installation](https://docs.mongodb.com/manual/installation/)
- [Git Installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nodemon Documentation](https://nodemon.io/)

## 🆘 Hỗ Trợ

Nếu bạn gặp vấn đề:

1. Kiểm tra [Troubleshooting Guide](../maintenance/troubleshooting.md)
2. Tìm kiếm trên Stack Overflow
3. Tạo issue trên GitHub repository
4. Liên hệ team development

---

**Lưu ý**: Đảm bảo bạn đã cài đặt đúng phiên bản của tất cả các phần mềm bắt buộc trước khi tiếp tục!
