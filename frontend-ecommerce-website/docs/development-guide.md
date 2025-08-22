# Hướng dẫn phát triển Frontend E-commerce Website

Tài liệu chi tiết về quy trình phát triển, coding standards và best practices cho dự án Frontend E-commerce Website.

## 🚀 Quy trình phát triển

### 1. Setup Development Environment

```bash
# Clone repository
git clone <repository-url>
cd frontend-ecommerce-website

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Chạy linter
npm run lint
```

### 2. Git Workflow

#### Branch Strategy
```
main (production)
├── develop (staging)
├── feature/user-authentication
├── feature/product-listing
├── bugfix/login-issue
└── hotfix/critical-bug
```

#### Commit Convention
```bash
# Format: type(scope): description

# Examples:
feat(auth): add login functionality
fix(products): resolve image loading issue
docs(readme): update installation guide
style(components): improve button styling
refactor(api): optimize API calls
test(homepage): add unit tests
chore(deps): update dependencies
```

#### Pull Request Process
1. Tạo feature branch từ `develop`
2. Phát triển tính năng
3. Viết tests
4. Chạy linter và tests
5. Tạo Pull Request
6. Code review
7. Merge vào `develop`

## 📝 Coding Standards

### 1. JavaScript/JSX Standards

#### Naming Conventions
```jsx
// Components: PascalCase
const ProductCard = () => {};

// Functions: camelCase
const handleClick = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Variables: camelCase
const productName = 'iPhone 15';

// Files: PascalCase for components, camelCase for utilities
ProductCard.jsx
useLocalStorage.js
```

#### Import/Export Organization
```jsx
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 2. Internal components
import ProductCard from '../components/ProductCard/ProductCard';
import Header from '../components/Header/Header';

// 3. Utilities and hooks
import { formatPrice } from '../../utils/format';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// 4. Styles
import { Wrapper } from './style';
```

#### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './style';

const ComponentName = ({ prop1, prop2, children }) => {
  // 1. State declarations
  const [state, setState] = useState(initialValue);

  // 2. Custom hooks
  const customHook = useCustomHook();

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 5. Helper functions
  const helperFunction = () => {
    // Helper logic
  };

  // 6. Render
  return (
    <Wrapper>
      {/* JSX content */}
    </Wrapper>
  );
};

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  children: PropTypes.node,
};

ComponentName.defaultProps = {
  prop2: 0,
  children: null,
};

export default ComponentName;
```

### 2. Styled Components Standards

#### Naming Convention
```jsx
// Wrapper components: Wrapper + ComponentName
export const WrapperProductCard = styled.div`
  // styles
`;

// Specific styled components: Descriptive name
export const ProductImage = styled.img`
  // styles
`;

export const PriceText = styled.span`
  // styles
`;
```

#### Organization
```jsx
// style.js
import styled from 'styled-components';

// 1. Layout components
export const Wrapper = styled.div`
  // layout styles
`;

export const Container = styled.div`
  // container styles
`;

// 2. Typography components
export const Title = styled.h1`
  // title styles
`;

export const Description = styled.p`
  // description styles
`;

// 3. Interactive components
export const Button = styled.button`
  // button styles
`;

export const Input = styled.input`
  // input styles
`;

// 4. Responsive styles
export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;
```

### 3. State Management Standards

#### Redux Toolkit Structure
```jsx
// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/products', { params });
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      priceRange: [0, 1000000],
      sortBy: 'name',
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000000],
        sortBy: 'name',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
```

#### Using Redux in Components
```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilter } from '../../redux/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilter(newFilters));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

## 🧪 Testing Standards

### 1. Unit Testing

#### Component Testing
```jsx
// src/components/ProductCard/ProductCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 100000,
  image: 'test.jpg',
  rating: 4.5,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100,000 ₫')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    const mockOnAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    fireEvent.click(screen.getByText('Thêm vào giỏ'));
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows out of stock message when countInStock is 0', () => {
    const outOfStockProduct = { ...mockProduct, countInStock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Hết hàng')).toBeInTheDocument();
    expect(screen.getByText('Thêm vào giỏ')).toBeDisabled();
  });
});
```

#### Hook Testing
```jsx
// src/hooks/useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    
    expect(result.current[0]).toBe('default');
  });

  it('returns stored value from localStorage', () => {
    localStorage.setItem('test', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    
    expect(result.current[0]).toBe('stored');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('test')).toBe(JSON.stringify('new value'));
  });
});
```

### 2. Integration Testing

```jsx
// src/pages/HomePage/HomePage.integration.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import productReducer from '../../redux/slices/productSlice';

const mockStore = configureStore({
  reducer: {
    products: productReducer,
  },
});

describe('HomePage Integration', () => {
  it('loads and displays featured products', async () => {
    render(
      <Provider store={mockStore}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sản phẩm nổi bật')).toBeInTheDocument();
    });
  });
});
```

## 🎨 UI/UX Standards

### 1. Color Palette

```jsx
// src/theme/colors.js
export const colors = {
  // Primary colors
  primary: '#e94560',
  primaryLight: '#ff6b7a',
  primaryDark: '#d63384',
  
  // Secondary colors
  secondary: '#f8f9fa',
  secondaryLight: '#ffffff',
  secondaryDark: '#e9ecef',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  
  // Status colors
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8',
  
  // Background colors
  background: '#ffffff',
  backgroundLight: '#f8f9fa',
  backgroundDark: '#343a40',
  
  // Border colors
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderDark: '#cccccc',
};
```

### 2. Typography

```jsx
// src/theme/typography.js
export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Georgia, serif',
  },
  
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

### 3. Spacing

```jsx
// src/theme/spacing.js
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
};
```

### 4. Breakpoints

```jsx
// src/theme/breakpoints.js
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
  ultraWide: '1440px',
};

export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  ultraWide: `@media (min-width: ${breakpoints.ultraWide})`,
};
```

## 🔧 Development Tools

### 1. ESLint Configuration

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
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      
      // Formatting rules
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
];
```

### 2. Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 3. Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['antd', 'styled-components'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
    },
  },
});
```

## 🚀 Performance Best Practices

### 1. Code Splitting

```jsx
// Lazy loading components
import React, { lazy, Suspense } from 'react';

const ProductDetails = lazy(() => import('../pages/ProductDetailsPage/ProductDetailsPage'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
};
```

### 2. Memoization

```jsx
import React, { memo, useMemo, useCallback } from 'react';

// Memoize components
const ProductCard = memo(({ product, onAddToCart }) => {
  // Component logic
});

// Memoize expensive calculations
const ProductList = ({ products, filters }) => {
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.price >= filters.minPrice && 
      product.price <= filters.maxPrice
    );
  }, [products, filters]);

  // Memoize callbacks
  const handleAddToCart = useCallback((product) => {
    // Add to cart logic
  }, []);
};
```

### 3. Image Optimization

```jsx
// Lazy loading images
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductImage = ({ src, alt }) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc="/placeholder.jpg"
      threshold={100}
    />
  );
};
```

## 📚 Tài liệu tham khảo

- [React Best Practices](https://react.dev/learn)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [Styled Components Best Practices](https://styled-components.com/docs/basics)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
