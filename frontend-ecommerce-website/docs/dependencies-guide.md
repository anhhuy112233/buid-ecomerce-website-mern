# Hướng dẫn Dependencies - Frontend E-commerce Website

Tài liệu chi tiết về tất cả các thư viện, framework và dependencies được sử dụng trong dự án Frontend E-commerce Website.

## 📦 Tổng quan Dependencies

### Core Dependencies (Production)
Các thư viện cần thiết cho việc chạy ứng dụng trong production:

| Package | Version | Mục đích |
|---------|---------|----------|
| `react` | ^19.1.1 | Thư viện UI chính |
| `react-dom` | ^19.1.1 | React DOM rendering |
| `react-router-dom` | ^7.8.0 | Client-side routing |
| `@reduxjs/toolkit` | ^2.8.2 | State management |
| `react-redux` | ^9.2.0 | React bindings cho Redux |
| `antd` | ^5.26.7 | UI component library |
| `styled-components` | ^6.1.19 | CSS-in-JS styling |
| `react-slick` | ^0.31.0 | Carousel/slider component |
| `slick-carousel` | ^1.8.1 | CSS cho carousel |

### Development Dependencies
Các thư viện hỗ trợ phát triển và build:

| Package | Version | Mục đích |
|---------|---------|----------|
| `vite` | ^7.1.0 | Build tool và dev server |
| `@vitejs/plugin-react` | ^4.7.0 | Vite plugin cho React |
| `eslint` | ^9.32.0 | Code linting |
| `@eslint/js` | ^9.32.0 | ESLint JavaScript rules |
| `eslint-plugin-react-hooks` | ^5.2.0 | ESLint rules cho React Hooks |
| `eslint-plugin-react-refresh` | ^0.4.20 | ESLint rules cho React Refresh |
| `@types/react` | ^19.1.9 | TypeScript types cho React |
| `@types/react-dom` | ^19.1.7 | TypeScript types cho React DOM |
| `globals` | ^16.3.0 | Global variables cho ESLint |

## 🔧 Chi tiết từng Dependency

### 1. React Ecosystem

#### React (^19.1.1)
**Mục đích**: Thư viện JavaScript chính để xây dựng user interface.

**Tính năng chính**:
- Component-based architecture
- Virtual DOM
- JSX syntax
- Hooks (useState, useEffect, etc.)
- Concurrent features

**Cách sử dụng**:
```jsx
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

#### React DOM (^19.1.1)
**Mục đích**: Package để render React components vào DOM.

**Tính năng chính**:
- DOM rendering
- Event handling
- Reconciliation
- Hydration

**Cách sử dụng**:
```jsx
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
```

### 2. Routing

#### React Router DOM (^7.8.0)
**Mục đích**: Client-side routing cho React applications.

**Tính năng chính**:
- Declarative routing
- Nested routes
- Route parameters
- Navigation guards
- History management

**Cách sử dụng**:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Navigation**:
```jsx
import { useNavigate, Link } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <button onClick={() => navigate('/products')}>
        Products
      </button>
    </nav>
  );
}
```

### 3. State Management

#### Redux Toolkit (^2.8.2)
**Mục đích**: State management library với toolkit để đơn giản hóa Redux.

**Tính năng chính**:
- Simplified Redux setup
- Immer integration
- RTK Query
- DevTools integration
- TypeScript support

**Cách sử dụng**:
```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export const { increment, decrement } = counterSlice.actions;
export default store;
```

#### React Redux (^9.2.0)
**Mục đích**: React bindings cho Redux.

**Cách sử dụng**:
```jsx
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';

// Provider
function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}

// Hooks
function MyComponent() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
    </div>
  );
}
```

### 4. UI Components

#### Ant Design (^5.26.7)
**Mục đích**: UI component library với thiết kế đẹp và responsive.

**Tính năng chính**:
- 60+ components
- Design system
- Theme customization
- Internationalization
- Accessibility

**Cách sử dụng**:
```jsx
import { Button, Card, Input, Form } from 'antd';

function ProductForm() {
  return (
    <Card title="Add Product">
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input placeholder="Product name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
```

#### Styled Components (^6.1.19)
**Mục đích**: CSS-in-JS library để styling components.

**Tính năng chính**:
- Component-based styling
- Dynamic styling
- Theme support
- CSS prop forwarding
- Server-side rendering

**Cách sử dụng**:
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'black'};
  padding: 10px 20px;
  border: 2px solid blue;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.primary ? 'darkblue' : 'lightgray'};
  }
`;

function MyComponent() {
  return (
    <div>
      <StyledButton>Normal Button</StyledButton>
      <StyledButton primary>Primary Button</StyledButton>
    </div>
  );
}
```

### 5. Carousel/Slider

#### React Slick (^0.31.0) + Slick Carousel (^1.8.1)
**Mục đích**: Carousel/slider component cho React.

**Tính năng chính**:
- Touch/swipe support
- Responsive
- Multiple slides
- Custom arrows
- Autoplay

**Cách sử dụng**:
```jsx
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      <div><img src="product1.jpg" alt="Product 1" /></div>
      <div><img src="product2.jpg" alt="Product 2" /></div>
      <div><img src="product3.jpg" alt="Product 3" /></div>
    </Slider>
  );
}
```

### 6. Build Tools

#### Vite (^7.1.0)
**Mục đích**: Modern build tool và development server.

**Tính năng chính**:
- Fast HMR (Hot Module Replacement)
- ES modules
- Optimized builds
- Plugin system
- TypeScript support

**Cấu hình cơ bản**:
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
});
```

#### Vite Plugin React (^4.7.0)
**Mục đích**: Plugin Vite cho React với Fast Refresh.

**Tính năng chính**:
- Fast Refresh
- JSX support
- React DevTools integration

### 7. Code Quality

#### ESLint (^9.32.0)
**Mục đích**: Code linting để đảm bảo code quality.

**Cấu hình**:
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
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

## 📋 Quản lý Dependencies

### Cài đặt dependencies

```bash
# Cài đặt production dependencies
npm install react react-dom

# Cài đặt development dependencies
npm install --save-dev eslint @types/react

# Cài đặt exact version
npm install react@19.1.1

# Cài đặt từ package.json
npm install
```

### Cập nhật dependencies

```bash
# Kiểm tra outdated packages
npm outdated

# Cập nhật tất cả dependencies
npm update

# Cập nhật specific package
npm update react

# Cập nhật lên version mới nhất
npm install react@latest
```

### Gỡ bỏ dependencies

```bash
# Gỡ bỏ production dependency
npm uninstall react-slick

# Gỡ bỏ development dependency
npm uninstall --save-dev eslint

# Gỡ bỏ và cập nhật package.json
npm uninstall --save react-slick
```

### Kiểm tra dependencies

```bash
# Xem dependency tree
npm list

# Xem dependency tree với depth
npm list --depth=2

# Kiểm tra security vulnerabilities
npm audit

# Sửa security vulnerabilities
npm audit fix
```

## 🔄 Migration và Updates

### React 18 → React 19
```bash
# Cập nhật React
npm install react@latest react-dom@latest

# Cập nhật types
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### Redux Toolkit Updates
```bash
# Cập nhật Redux Toolkit
npm install @reduxjs/toolkit@latest react-redux@latest
```

### Ant Design Updates
```bash
# Cập nhật Ant Design
npm install antd@latest
```

## 🚨 Troubleshooting

### Peer Dependencies
```bash
# Kiểm tra peer dependencies
npm ls

# Cài đặt peer dependencies
npm install --legacy-peer-deps
```

### Version Conflicts
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài đặt lại
npm install
```

### Build Issues
```bash
# Xóa cache
npm run build -- --force

# Kiểm tra Vite cache
rm -rf node_modules/.vite
```

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Ant Design Documentation](https://ant.design/)
- [Styled Components Documentation](https://styled-components.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

## 🎯 Best Practices

1. **Version Management**: Sử dụng exact versions cho production dependencies
2. **Security**: Chạy `npm audit` thường xuyên
3. **Updates**: Cập nhật dependencies định kỳ
4. **Tree Shaking**: Sử dụng ES modules để tối ưu bundle size
5. **Code Splitting**: Sử dụng React.lazy() và dynamic imports
6. **Performance**: Monitor bundle size và loading times
