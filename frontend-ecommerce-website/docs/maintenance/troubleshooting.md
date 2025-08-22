# Troubleshooting Guide - Frontend E-commerce Website

Hướng dẫn xử lý các sự cố thường gặp trong quá trình phát triển và vận hành Frontend E-commerce Website.

## 🚨 Sự cố thường gặp

### 1. Lỗi Development Server

#### Lỗi: Port đã được sử dụng
```bash
Error: listen EADDRINUSE: address already in use :::5173
```

**Nguyên nhân**: Port 5173 đã được sử dụng bởi process khác.

**Giải pháp**:
```bash
# Tìm process sử dụng port 5173
lsof -i :5173

# Kill process
kill -9 <PID>

# Hoặc thay đổi port trong vite.config.js
export default defineConfig({
  server: {
    port: 3001, // Thay đổi port
  },
});
```

#### Lỗi: Module không tìm thấy
```bash
Error: Cannot find module 'react'
```

**Nguyên nhân**: Dependencies chưa được cài đặt hoặc bị hỏng.

**Giải pháp**:
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài đặt lại dependencies
npm install

# Hoặc sử dụng yarn
yarn install
```

### 2. Lỗi Build

#### Lỗi: Build failed
```bash
Error: Build failed with errors
```

**Giải pháp**:
```bash
# Xóa cache
npm run build -- --force

# Xóa thư mục dist
rm -rf dist
npm run build

# Kiểm tra linter errors
npm run lint
```

#### Lỗi: Memory limit exceeded
```bash
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed
```

**Giải pháp**:
```bash
# Tăng memory limit cho Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Hoặc trong package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

### 3. Lỗi Dependencies

#### Lỗi: Peer dependencies
```bash
npm ERR! ERESOLVE overriding peer dependency
```

**Giải pháp**:
```bash
# Cài đặt với legacy peer deps
npm install --legacy-peer-deps

# Hoặc sử dụng yarn
yarn install --ignore-engines
```

#### Lỗi: Version conflicts
```bash
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Giải pháp**:
```bash
# Kiểm tra dependency tree
npm ls

# Cập nhật dependencies
npm update

# Hoặc force install
npm install --force
```

### 4. Lỗi React

#### Lỗi: Invalid hook call
```bash
Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**Nguyên nhân**: Hook được gọi bên ngoài React component.

**Giải pháp**:
```jsx
// ❌ Sai
const useCustomHook = () => {
  const [state, setState] = useState(0);
  return [state, setState];
};

const helper = useCustomHook(); // Hook bên ngoài component

// ✅ Đúng
const MyComponent = () => {
  const [state, setState] = useCustomHook(); // Hook bên trong component
  return <div>{state}</div>;
};
```

#### Lỗi: Maximum update depth exceeded
```bash
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
```

**Nguyên nhân**: Infinite loop trong useEffect hoặc state updates.

**Giải pháp**:
```jsx
// ❌ Sai - Infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Đúng - Có dependency array
useEffect(() => {
  setCount(prevCount => prevCount + 1);
}, []); // Empty dependency array
```

### 5. Lỗi Redux

#### Lỗi: Store not found
```bash
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```

**Giải pháp**:
```jsx
// Đảm bảo Provider bao quanh app
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}
```

#### Lỗi: Immutable state
```bash
Error: A non-serializable value was detected in the state
```

**Giải pháp**:
```jsx
// Sử dụng Immer trong Redux Toolkit
const slice = createSlice({
  name: 'example',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer sẽ handle immutability
    },
  },
});
```

### 6. Lỗi Styled Components

#### Lỗi: Styled component not rendering
```bash
Error: styled.div is not a function
```

**Nguyên nhân**: Import sai hoặc version conflict.

**Giải pháp**:
```jsx
// ✅ Đúng import
import styled from 'styled-components';

// Kiểm tra version
npm list styled-components
```

#### Lỗi: CSS not applying
```bash
// Styles không được apply
```

**Giải pháp**:
```jsx
// Đảm bảo styled component được import đúng
import { Wrapper } from './style';

// Kiểm tra CSS specificity
const Wrapper = styled.div`
  color: red !important; // Sử dụng !important nếu cần
`;
```

### 7. Lỗi Routing

#### Lỗi: Route not found
```bash
Error: No routes matched location "/invalid-route"
```

**Giải pháp**:
```jsx
// Thêm catch-all route
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

#### Lỗi: Navigation not working
```bash
// Link không hoạt động
```

**Giải pháp**:
```jsx
// Đảm bảo BrowserRouter bao quanh app
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

### 8. Lỗi API Calls

#### Lỗi: CORS
```bash
Access to fetch at 'http://localhost:3000/api/products' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Giải pháp**:
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

#### Lỗi: Network error
```bash
Error: Network Error
```

**Giải pháp**:
```jsx
// Thêm error handling
const fetchData = async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Handle error appropriately
  }
};
```

## 🔧 Debugging Tools

### 1. React Developer Tools

```bash
# Cài đặt extension cho browser
# Chrome: React Developer Tools
# Firefox: React Developer Tools
```

### 2. Redux DevTools

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
```

### 3. Browser DevTools

```javascript
// Console debugging
console.log('Debug info:', data);
console.table(arrayData);
console.group('Group name');
console.groupEnd();

// Performance monitoring
console.time('operation');
// ... operation
console.timeEnd('operation');
```

### 4. Network Tab

```javascript
// Kiểm tra API calls
// 1. Mở DevTools
// 2. Chuyển sang Network tab
// 3. Reload page
// 4. Kiểm tra requests và responses
```

## 🧪 Testing Issues

### 1. Test không chạy

```bash
# Kiểm tra test setup
npm test

# Chạy test với verbose
npm test -- --verbose

# Chạy test specific file
npm test -- ProductCard.test.jsx
```

### 2. Mock không hoạt động

```jsx
// Đảm bảo mock được setup đúng
jest.mock('../../api/products', () => ({
  fetchProducts: jest.fn(() => Promise.resolve([])),
}));
```

### 3. Async test issues

```jsx
// Sử dụng async/await
it('should fetch products', async () => {
  await act(async () => {
    render(<ProductList />);
  });
  
  await waitFor(() => {
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});
```

## 📊 Performance Issues

### 1. Bundle size quá lớn

```bash
# Analyze bundle
npm run build
npx vite-bundle-analyzer dist

# Code splitting
import { lazy, Suspense } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### 2. Memory leaks

```jsx
// Cleanup effects
useEffect(() => {
  const subscription = someAPI.subscribe();
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

### 3. Re-renders không cần thiết

```jsx
// Sử dụng React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// Sử dụng useMemo và useCallback
const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
const memoizedCallback = useCallback(() => {
  // callback logic
}, [dependencies]);
```

## 🔍 Common Debugging Steps

### 1. Systematic Approach

1. **Reproduce the issue**: Xác định steps để reproduce
2. **Check console**: Xem error messages
3. **Check network**: Kiểm tra API calls
4. **Check state**: Kiểm tra Redux state
5. **Check props**: Kiểm tra component props
6. **Isolate the problem**: Tách component để test riêng

### 2. Debugging Checklist

- [ ] Console có error messages?
- [ ] Network requests thành công?
- [ ] Redux state đúng?
- [ ] Component props đúng?
- [ ] Dependencies đã cài đặt?
- [ ] Environment variables đúng?
- [ ] Browser compatibility?

### 3. Logging Strategy

```javascript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
}
```

## 🚀 Prevention Strategies

### 1. Code Quality

```bash
# Pre-commit hooks
npm install --save-dev husky lint-staged

# package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

### 2. Type Checking

```javascript
// PropTypes
import PropTypes from 'prop-types';

Component.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

### 3. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## 📞 Getting Help

### 1. Internal Resources

- [Development Guide](./development-guide.md)
- [Installation Guide](./installation-guide.md)
- [Dependencies Guide](./dependencies-guide.md)

### 2. External Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Stack Overflow](https://stackoverflow.com/)

### 3. Team Support

- Tạo issue trên repository
- Liên hệ team lead
- Code review sessions

## 📋 Troubleshooting Checklist

### Development Issues
- [ ] Node.js version đúng?
- [ ] Dependencies đã cài đặt?
- [ ] Environment variables đúng?
- [ ] Port không bị conflict?
- [ ] Linter không báo lỗi?

### Runtime Issues
- [ ] Console có errors?
- [ ] Network requests thành công?
- [ ] Redux state đúng?
- [ ] Component props đúng?
- [ ] Browser compatibility?

### Build Issues
- [ ] All dependencies resolved?
- [ ] No syntax errors?
- [ ] Environment variables set?
- [ ] Build script correct?
- [ ] Output directory writable?

### Performance Issues
- [ ] Bundle size reasonable?
- [ ] No memory leaks?
- [ ] Images optimized?
- [ ] Code splitting applied?
- [ ] Caching configured?
