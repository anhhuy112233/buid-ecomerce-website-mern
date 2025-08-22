// Nơi tập hợp và mount các router con vào app Express
const userRouter = require('./UserRouter') // Router xử lý các API liên quan tới người dùng
const productRouter = require('./ProductRouter') // Router xử lý các API liên quan tới product

const routes = (app) => {
  // Các API của user sẽ có prefix /api/users
  app.use('/api/users', userRouter)
  app.use('/api/product', productRouter)

  // Endpoint kiểm tra sống (health check)
  app.get('/', (req, res) => res.send('Backend is running 🚀'))
}

module.exports = routes;
