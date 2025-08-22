# Hướng dẫn cài đặt Frontend E-commerce Website

Hướng dẫn chi tiết cách cài đặt và thiết lập dự án Frontend E-commerce Website trên các hệ điều hành khác nhau.

## 📋 Yêu cầu hệ thống

### Yêu cầu tối thiểu
- **Node.js**: Phiên bản 18.0.0 trở lên
- **npm**: Phiên bản 9.0.0 trở lên (hoặc yarn 1.22.0+)
- **RAM**: Tối thiểu 4GB
- **Disk Space**: Tối thiểu 2GB trống

### Yêu cầu khuyến nghị
- **Node.js**: Phiên bản 20.0.0 trở lên
- **npm**: Phiên bản 10.0.0 trở lên
- **RAM**: 8GB trở lên
- **Disk Space**: 5GB trống
- **Browser**: Chrome 120+, Firefox 115+, Safari 16+

## 🛠️ Cài đặt phần mềm cần thiết

### 1. Cài đặt Node.js

#### Windows
1. Truy cập [nodejs.org](https://nodejs.org/)
2. Tải phiên bản LTS (Long Term Support)
3. Chạy file installer và làm theo hướng dẫn
4. Kiểm tra cài đặt:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Sử dụng Homebrew
brew install node

# Hoặc sử dụng nvm (khuyến nghị)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

#### Linux (Ubuntu/Debian)
```bash
# Cài đặt Node.js từ NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra cài đặt
node --version
npm --version
```

### 2. Cài đặt Git

#### Windows
1. Tải Git từ [git-scm.com](https://git-scm.com/)
2. Chạy installer và làm theo hướng dẫn
3. Kiểm tra: `git --version`

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
sudo apt-get update
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

### 3. Cài đặt Code Editor (khuyến nghị)

#### Visual Studio Code
1. Tải từ [code.visualstudio.com](https://code.visualstudio.com/)
2. Cài đặt các extension hữu ích:
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - Auto Rename Tag
   - Bracket Pair Colorizer

## 🚀 Cài đặt dự án

### 1. Clone repository

```bash
# Clone repository
git clone <repository-url>
cd frontend-ecommerce-website

# Hoặc nếu bạn đã có code local
cd frontend-ecommerce-website
```

### 2. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm (khuyến nghị cho performance)
npm install -g pnpm
pnpm install
```

### 3. Thiết lập môi trường

Tạo file `.env` trong thư mục gốc:

```bash
# Tạo file .env
touch .env
```

Thêm các biến môi trường cần thiết:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=E-commerce Website
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### 4. Kiểm tra cài đặt

```bash
# Kiểm tra dependencies
npm list --depth=0

# Kiểm tra scripts có sẵn
npm run

# Chạy linter
npm run lint

# Chạy development server
npm run dev
```

## 🧪 Kiểm tra cài đặt

### 1. Chạy development server

```bash
npm run dev
```

Bạn sẽ thấy output tương tự:
```
  VITE v7.1.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 2. Mở trình duyệt

Truy cập `http://localhost:5173` để xem ứng dụng.

### 3. Kiểm tra các tính năng cơ bản

- ✅ Trang chủ hiển thị
- ✅ Navigation hoạt động
- ✅ Responsive design
- ✅ Console không có lỗi

## 🔧 Cấu hình bổ sung

### 1. Cấu hình ESLint

File `eslint.config.js` đã được cấu hình sẵn. Bạn có thể tùy chỉnh:

```javascript
// eslint.config.js
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Tùy chỉnh rules ở đây
    },
  },
];
```

### 2. Cấu hình Vite

File `vite.config.js` cơ bản:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### 3. Cấu hình Git Hooks (tùy chọn)

```bash
# Cài đặt husky cho git hooks
npm install --save-dev husky lint-staged

# Khởi tạo husky
npx husky install

# Thêm pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

## 🚨 Xử lý sự cố thường gặp

### 1. Lỗi Node.js version

```bash
# Kiểm tra version
node --version

# Nếu version quá cũ, cập nhật Node.js
# Windows: Tải từ nodejs.org
# macOS: brew upgrade node
# Linux: nvm install --lts
```

### 2. Lỗi dependencies

```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài đặt lại
npm install
```

### 3. Lỗi port đã được sử dụng

```bash
# Tìm process sử dụng port 5173
lsof -i :5173

# Kill process
kill -9 <PID>

# Hoặc thay đổi port trong vite.config.js
```

### 4. Lỗi CORS

Nếu gặp lỗi CORS khi gọi API:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

### 5. Lỗi build

```bash
# Xóa cache
npm run build -- --force

# Hoặc xóa thư mục dist
rm -rf dist
npm run build
```

## 📋 Checklist cài đặt

- [ ] Node.js 18+ đã được cài đặt
- [ ] npm/yarn đã được cài đặt
- [ ] Git đã được cài đặt
- [ ] Repository đã được clone
- [ ] Dependencies đã được cài đặt
- [ ] File .env đã được tạo
- [ ] Development server chạy thành công
- [ ] Ứng dụng hiển thị trong trình duyệt
- [ ] Không có lỗi trong console
- [ ] ESLint không báo lỗi

## 🎉 Hoàn thành

Chúc mừng! Bạn đã cài đặt thành công Frontend E-commerce Website. Bây giờ bạn có thể:

1. Bắt đầu phát triển tính năng mới
2. Đọc [Development Guide](./development-guide.md) để biết quy trình phát triển
3. Xem [Component Library](./components-guide.md) để hiểu các component có sẵn
4. Kiểm tra [Testing Guide](./testing/testing-guide.md) để viết test

Nếu bạn gặp vấn đề, hãy xem [Troubleshooting Guide](./maintenance/troubleshooting.md) hoặc tạo issue trên repository.
