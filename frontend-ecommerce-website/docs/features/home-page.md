# Trang chủ - Home Page

Tài liệu chi tiết về tính năng trang chủ của ứng dụng E-commerce Website.

## 🏠 Tổng quan

Trang chủ là điểm khởi đầu của ứng dụng, cung cấp cho người dùng cái nhìn tổng quan về website và các sản phẩm nổi bật.

### Tính năng chính
- **Hero Slider**: Hiển thị banner quảng cáo và sản phẩm nổi bật
- **Sản phẩm nổi bật**: Grid hiển thị các sản phẩm được ưa chuộng
- **Navigation**: Menu điều hướng chính
- **Responsive Design**: Tương thích với mọi thiết bị

## 📁 Cấu trúc file

```
src/pages/HomePage/
├── HomePage.jsx           # Component chính
└── style.js              # Styled components
```

## 🎨 Component Structure

### HomePage.jsx

```jsx
import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperHomePage } from './style';

const HomePage = () => {
  return (
    <WrapperHomePage>
      {/* Hero Slider Section */}
      <section className="hero-section">
        <SliderComponent />
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2>Sản phẩm nổi bật</h2>
          <div className="products-grid">
            {/* Product cards sẽ được render ở đây */}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Danh mục sản phẩm</h2>
          <div className="categories-grid">
            {/* Category cards */}
          </div>
        </div>
      </section>
    </WrapperHomePage>
  );
};

export default HomePage;
```

### style.js

```jsx
import styled from 'styled-components';

export const WrapperHomePage = styled.div`
  .hero-section {
    margin-bottom: 40px;
  }

  .featured-products {
    padding: 40px 0;
    background: #f8f9fa;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    color: #333;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    h2 {
      font-size: 24px;
    }
  }
`;
```

## 🎠 Hero Slider Component

### SliderComponent.jsx

```jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { WrapperSlider } from './style';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        }
      }
    ]
  };

  const sliderData = [
    {
      id: 1,
      image: '/src/assets/images/Slider1.jpg',
      title: 'Sản phẩm mới nhất',
      description: 'Khám phá bộ sưu tập mới nhất của chúng tôi'
    },
    {
      id: 2,
      image: '/src/assets/images/Slider2.jpg',
      title: 'Giảm giá lớn',
      description: 'Ưu đãi lên đến 50% cho các sản phẩm được chọn'
    },
    // ... more slides
  ];

  return (
    <WrapperSlider>
      <Slider {...settings}>
        {sliderData.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button className="cta-button">Khám phá ngay</button>
            </div>
          </div>
        ))}
      </Slider>
    </WrapperSlider>
  );
};

export default SliderComponent;
```

### Slider Styles

```jsx
import styled from 'styled-components';

export const WrapperSlider = styled.div`
  .slide {
    position: relative;
    height: 500px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 2;
  }

  .slide-content h2 {
    font-size: 48px;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .slide-content p {
    font-size: 18px;
    margin-bottom: 24px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }

  .cta-button {
    background: #e94560;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: #d63384;
    }
  }

  @media (max-width: 768px) {
    .slide {
      height: 300px;
    }

    .slide-content h2 {
      font-size: 32px;
    }

    .slide-content p {
      font-size: 16px;
    }
  }
`;
```

## 🛍️ Product Card Component

### CardComponent.jsx

```jsx
import React from 'react';
import { WrapperCard } from './style';

const CardComponent = ({ product }) => {
  const {
    id,
    name,
    image,
    price,
    rating,
    countInStock,
    description
  } = product;

  return (
    <WrapperCard>
      <div className="card-image">
        <img src={image} alt={name} />
        {countInStock === 0 && (
          <div className="out-of-stock">Hết hàng</div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <span 
              key={index} 
              className={`star ${index < rating ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
          <span className="rating-text">({rating})</span>
        </div>
        
        <div className="product-price">
          <span className="price">{price.toLocaleString('vi-VN')} ₫</span>
        </div>
        
        <button 
          className="add-to-cart"
          disabled={countInStock === 0}
        >
          {countInStock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
        </button>
      </div>
    </WrapperCard>
  );
};

export default CardComponent;
```

### Card Styles

```jsx
import styled from 'styled-components';

export const WrapperCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }

  .out-of-stock {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255,0,0,0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .card-content {
    padding: 16px;
  }

  .product-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
    line-height: 1.4;
  }

  .product-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-rating {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    .star {
      color: #ddd;
      font-size: 16px;
      
      &.filled {
        color: #ffc107;
      }
    }
    
    .rating-text {
      margin-left: 8px;
      font-size: 14px;
      color: #666;
    }
  }

  .product-price {
    margin-bottom: 16px;
    
    .price {
      font-size: 18px;
      font-weight: bold;
      color: #e94560;
    }
  }

  .add-to-cart {
    width: 100%;
    background: #e94560;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #d63384;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;
```

## 🔄 State Management

### Redux Integration

```jsx
// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    const response = await fetch('/api/products/featured');
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    featured: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
```

### Using Redux in HomePage

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../../redux/slices/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featured, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <WrapperHomePage>
      <SliderComponent />
      
      <section className="featured-products">
        <div className="container">
          <h2>Sản phẩm nổi bật</h2>
          <div className="products-grid">
            {featured.map((product) => (
              <CardComponent key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </WrapperHomePage>
  );
};
```

## 🎯 Performance Optimization

### 1. Image Optimization

```jsx
// Lazy loading cho images
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CardComponent = ({ product }) => {
  return (
    <WrapperCard>
      <div className="card-image">
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          placeholderSrc="/placeholder.jpg"
        />
      </div>
      {/* ... rest of component */}
    </WrapperCard>
  );
};
```

### 2. Component Memoization

```jsx
import React, { memo } from 'react';

const CardComponent = memo(({ product }) => {
  // Component logic
});

export default CardComponent;
```

### 3. Virtual Scrolling (for large lists)

```jsx
import { FixedSizeGrid as Grid } from 'react-window';

const ProductGrid = ({ products }) => {
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const productIndex = rowIndex * 4 + columnIndex;
    const product = products[productIndex];
    
    if (!product) return null;
    
    return (
      <div style={style}>
        <CardComponent product={product} />
      </div>
    );
  };

  return (
    <Grid
      columnCount={4}
      columnWidth={250}
      height={800}
      rowCount={Math.ceil(products.length / 4)}
      rowHeight={350}
      width={1000}
    >
      {Cell}
    </Grid>
  );
};
```

## 🧪 Testing

### Unit Tests

```jsx
// src/pages/HomePage/HomePage.test.jsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import productReducer from '../../redux/slices/productSlice';

const mockStore = configureStore({
  reducer: {
    products: productReducer,
  },
  preloadedState: {
    products: {
      featured: [
        {
          id: 1,
          name: 'Test Product',
          price: 100000,
          image: 'test.jpg',
        },
      ],
      loading: false,
      error: null,
    },
  },
});

describe('HomePage', () => {
  it('renders featured products', () => {
    render(
      <Provider store={mockStore}>
        <HomePage />
      </Provider>
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const loadingStore = configureStore({
      reducer: { products: productReducer },
      preloadedState: {
        products: { featured: [], loading: true, error: null },
      },
    });

    render(
      <Provider store={loadingStore}>
        <HomePage />
      </Provider>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## 🎨 Customization

### Theme Configuration

```jsx
// src/theme/colors.js
export const colors = {
  primary: '#e94560',
  secondary: '#d63384',
  background: '#f8f9fa',
  text: '#333',
  textLight: '#666',
  border: '#e0e0e0',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

// src/theme/spacing.js
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
};
```

### Responsive Breakpoints

```jsx
// src/theme/breakpoints.js
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};

export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
};
```

## 🚀 Deployment Considerations

### 1. SEO Optimization

```jsx
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>E-commerce Website - Trang chủ</title>
        <meta name="description" content="Khám phá các sản phẩm chất lượng cao với giá tốt nhất" />
        <meta name="keywords" content="ecommerce, shopping, online store" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Helmet>
      {/* Component content */}
    </>
  );
};
```

### 2. Progressive Web App (PWA)

```jsx
// public/manifest.json
{
  "name": "E-commerce Website",
  "short_name": "E-commerce",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#e94560",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 📚 Tài liệu tham khảo

- [React Router Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Styled Components Documentation](https://styled-components.com/)
- [React Slick Documentation](https://react-slick.neostack.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
