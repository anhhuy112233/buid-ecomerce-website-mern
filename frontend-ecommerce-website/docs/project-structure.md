# Cấu trúc dự án Frontend E-commerce Website

Tài liệu chi tiết về tổ chức thư mục, file và kiến trúc của dự án Frontend E-commerce Website.

## 📁 Cấu trúc thư mục tổng quan

```
frontend-ecommerce-website/
├── 📁 public/                 # Static assets
├── 📁 src/                    # Source code chính
│   ├── 📁 assets/            # Images, fonts, static files
│   ├── 📁 components/        # Reusable React components
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 pages/             # Page components
│   ├── 📁 redux/             # Redux store và slices
│   ├── 📁 routes/            # Routing configuration
│   ├── App.jsx               # Root component
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── 📁 docs/                  # Documentation
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies và scripts
├── README.md                # Project overview
└── vite.config.js           # Vite configuration
```

## 🔍 Chi tiết từng thư mục

### 📁 `public/` - Static Assets

Thư mục chứa các file tĩnh không cần xử lý bởi build tool.

```
public/
├── vite.svg                 # Vite logo
└── favicon.ico             # Website favicon
```

**Mục đích**:
- Chứa các file tĩnh (images, fonts, icons)
- Các file này được copy trực tiếp vào thư mục build
- Có thể truy cập trực tiếp từ root URL

**Cách sử dụng**:
```jsx
// Trong component
<img src="/vite.svg" alt="Vite Logo" />
```

### 📁 `src/` - Source Code

Thư mục chính chứa toàn bộ source code của ứng dụng.

#### 📁 `src/assets/` - Static Resources

```
src/assets/
└── 📁 images/              # Image files
    ├── dienthoai.webp      # Product images
    ├── dienthoaiss.webp
    ├── logo.jpg           # Logo files
    ├── logo.png
    ├── Slider1.jpg        # Slider images
    ├── Slider2.jpg
    ├── Slider3.jpg
    ├── Slider4.jpg
    └── tiki.png           # Brand images
```

**Mục đích**:
- Chứa images, fonts, icons cần xử lý bởi build tool
- Hỗ trợ optimization và compression
- Import trực tiếp trong components

**Cách sử dụng**:
```jsx
import logo from '../assets/images/logo.png';
import slider1 from '../assets/images/Slider1.jpg';

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <img src={slider1} alt="Slider" />
    </header>
  );
}
```

#### 📁 `src/components/` - Reusable Components

Thư mục chứa các React components có thể tái sử dụng.

```
src/components/
├── 📁 ButtonComponent/     # Button components
│   └── ButtonComponent.jsx
├── 📁 ButtonInputSearch/   # Search input components
│   └── ButtonInputSearch.jsx
├── 📁 CardComponent/       # Product card components
│   ├── CardComponent.jsx
│   └── style.js           # Styled components
├── 📁 DefaultComponent/    # Layout wrapper
│   └── DefaultComponent.jsx
├── 📁 HeaderComponent/     # Header components
│   ├── HeaderComponent.jsx
│   └── style.js
├── 📁 InputComponent/      # Input components
│   └── InputComponent.jsx
├── 📁 InputForm/          # Form components
│   ├── InputForm.jsx
│   └── style.js
├── 📁 NavbarComponent/     # Navigation components
│   ├── NavbarComponent.jsx
│   └── style.js
├── 📁 ProductDetailsComponent/ # Product detail components
│   ├── ProductDetailsComponent.jsx
│   └── style.js
├── 📁 SliderComponent/     # Carousel/slider components
│   ├── SliderComponent.jsx
│   └── style.js
└── 📁 TypeProduct/         # Product type components
    └── TypeProduct.jsx
```

**Cấu trúc component điển hình**:
```jsx
// src/components/CardComponent/CardComponent.jsx
import React from 'react';
import { WrapperCard } from './style';

const CardComponent = ({ product }) => {
  return (
    <WrapperCard>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </WrapperCard>
  );
};

export default CardComponent;
```

```jsx
// src/components/CardComponent/style.js
import styled from 'styled-components';

export const WrapperCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  h3 {
    margin: 8px 0;
    font-size: 16px;
  }
  
  p {
    color: #e94560;
    font-weight: bold;
  }
`;
```

#### 📁 `src/pages/` - Page Components

Thư mục chứa các page-level components.

```
src/pages/
├── 📁 HomePage/            # Trang chủ
│   ├── HomePage.jsx
│   └── style.js
├── 📁 NotFoundPage/        # 404 page
│   └── NotFoundPage.jsx
├── 📁 OrderPage/           # Trang đơn hàng
│   └── OrderPage.jsx
├── 📁 ProductDetailsPage/  # Trang chi tiết sản phẩm
│   └── ProductDetailsPage.jsx
├── 📁 ProductPage/         # Trang danh sách sản phẩm
│   └── ProductPage.jsx
├── 📁 SignInPage/          # Trang đăng nhập
│   ├── SignInPage.jsx
│   └── style.js
├── 📁 SignUpPage/          # Trang đăng ký
│   ├── SignUpPage.jsx
│   └── style.js
└── 📁 TypeProductPage/     # Trang sản phẩm theo loại
    ├── TypeProductPage.jsx
    └── style.js
```

**Cấu trúc page điển hình**:
```jsx
// src/pages/HomePage/HomePage.jsx
import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperHomePage } from './style';

const HomePage = () => {
  return (
    <WrapperHomePage>
      <SliderComponent />
      <div className="products-section">
        <h2>Sản phẩm nổi bật</h2>
        <div className="products-grid">
          {/* Product cards */}
        </div>
      </div>
    </WrapperHomePage>
  );
};

export default HomePage;
```

#### 📁 `src/redux/` - State Management

Thư mục chứa Redux store và slices.

```
src/redux/
├── 📁 slides/              # Redux slices
│   └── counterSlice.js     # Example slice
└── store.js                # Redux store configuration
```

**Cấu trúc Redux**:
```jsx
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slides/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

```jsx
// src/redux/slides/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 📁 `src/routes/` - Routing Configuration

Thư mục chứa cấu hình routing.

```
src/routes/
└── index.jsx               # Route definitions
```

**Cấu trúc routing**:
```jsx
// src/routes/index.jsx
import HomePage from '../pages/HomePage/HomePage';
import ProductPage from '../pages/ProductPage/ProductPage';
// ... other imports

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: 'product',
    page: ProductPage,
    isShowHeader: true,
  },
  // ... other routes
];
```

#### 📁 `src/hooks/` - Custom Hooks

Thư mục chứa custom React hooks (hiện tại trống, có thể mở rộng).

```
src/hooks/
└── (custom hooks sẽ được thêm ở đây)
```

**Ví dụ custom hook**:
```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
```

### 📄 Root Files

#### `src/App.jsx` - Root Component

```jsx
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

#### `src/main.jsx` - Entry Point

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

#### `src/index.css` - Global Styles

```css
/* Global CSS styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* ... other global styles */
```

## 🏗️ Kiến trúc ứng dụng

### 1. Component Architecture

```
App (Root)
├── Router
│   ├── DefaultComponent (Layout)
│   │   ├── HeaderComponent
│   │   │   └── NavbarComponent
│   │   └── Page Content
│   └── Page Components
│       ├── HomePage
│       ├── ProductPage
│       ├── ProductDetailsPage
│       └── ...
```

### 2. Data Flow

```
User Action → Component → Redux Action → Reducer → Store → Component Re-render
     ↑                                                           ↓
     └─────────────────── UI Update ←────────────────────────────┘
```

### 3. Styling Strategy

- **Styled Components**: CSS-in-JS cho component-specific styles
- **Global CSS**: Cho reset và base styles
- **Ant Design**: UI components với built-in styling

### 4. State Management

- **Local State**: useState cho component-specific state
- **Global State**: Redux Toolkit cho app-wide state
- **Form State**: Ant Design Form components

## 📋 Naming Conventions

### Files và Folders
- **Components**: PascalCase (e.g., `CardComponent.jsx`)
- **Pages**: PascalCase (e.g., `HomePage.jsx`)
- **Hooks**: camelCase với prefix `use` (e.g., `useLocalStorage.js`)
- **Styles**: camelCase (e.g., `style.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### Components
- **Function Components**: PascalCase
- **Styled Components**: PascalCase với prefix mô tả (e.g., `WrapperCard`)
- **Props**: camelCase
- **Event Handlers**: camelCase với prefix `handle` (e.g., `handleClick`)

### CSS Classes
- **Styled Components**: camelCase
- **CSS Classes**: kebab-case (nếu sử dụng)

## 🔧 Configuration Files

### `vite.config.js`
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
```

### `eslint.config.js`
```javascript
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
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
```

### `package.json`
```json
{
  "name": "frontend-ecommerce-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.8.2",
    "antd": "^5.26.7",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.8.0",
    "react-slick": "^0.31.0",
    "slick-carousel": "^1.8.1",
    "styled-components": "^6.1.19"
  }
}
```

## 🎯 Best Practices

### 1. Component Organization
- Mỗi component có thư mục riêng
- Tách logic và styling
- Sử dụng index files cho exports

### 2. File Structure
- Group related files together
- Consistent naming conventions
- Clear separation of concerns

### 3. Import/Export
- Use named exports cho components
- Use default exports cho pages
- Group imports: external → internal → relative

### 4. Performance
- Lazy load pages và components
- Optimize images và assets
- Use React.memo cho expensive components

## 🚀 Scaling Guidelines

### Khi dự án phát triển, có thể thêm:

```
src/
├── 📁 api/                  # API calls và services
├── 📁 constants/            # Constants và enums
├── 📁 context/              # React Context providers
├── 📁 layouts/              # Layout components
├── 📁 services/             # Business logic services
├── 📁 types/                # TypeScript types (nếu sử dụng TS)
├── 📁 utils/                # Utility functions
└── 📁 validations/          # Form validation schemas
```

### Cấu trúc component phức tạp hơn:
```
ComponentName/
├── index.jsx               # Main component
├── ComponentName.jsx       # Component logic
├── ComponentName.styles.js # Styled components
├── ComponentName.test.jsx  # Unit tests
└── ComponentName.stories.js # Storybook stories
```

## 📚 Tài liệu tham khảo

- [React File Structure](https://react.dev/learn/thinking-in-react)
- [Vite Project Structure](https://vitejs.dev/guide/)
- [Redux Toolkit Structure](https://redux-toolkit.js.org/usage/usage-guide)
- [Styled Components Best Practices](https://styled-components.com/docs/basics)
