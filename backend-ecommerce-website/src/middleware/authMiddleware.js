// Middleware xác thực JWT và phân quyền admin cho API
// - authenticate: đọc token từ header, verify, gắn req.user
// - authorizeAdmin: chỉ cho phép tiếp tục nếu req.user.isAdmin === true
const { verifyAccessToken } = require("../services/JwtService");

// Lấy access token từ request header
// Ưu tiên chuẩn Authorization: "Bearer <token>",
// fallback header tuỳ biến "token" để tương thích client cũ
const getTokenFromRequest = (req) => {
  // Lấy header Authorization (hỗ trợ cả key viết thường/viết hoa)
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  // Kiểm tra header có tồn tại và là chuỗi không
  if (authHeader && typeof authHeader === "string") {
    // Tách theo dấu cách: ví dụ "Bearer abc.xyz.123" -> ["Bearer", "abc.xyz.123"]
    const parts = authHeader.split(" ");
    // Đúng định dạng khi có 2 phần và phần đầu là "Bearer"
    if (parts.length === 2 && parts[0] === "Bearer") {
      // Trả về phần token (phần thứ 2)
      return parts[1];
    }
  }
  // Nếu không có Authorization, thử đọc từ header tuỳ biến 'token'
  const headerToken = req.headers["token"];
  // Chỉ xử lý khi là chuỗi
  if (headerToken && typeof headerToken === "string") {
    // Nếu client vẫn gửi theo dạng "Bearer <token>", cắt bỏ tiền tố
    if (headerToken.startsWith("Bearer ")) return headerToken.slice(7);
    // Ngược lại coi toàn bộ là token
    return headerToken;
  }
  // Không tìm thấy token ở bất kỳ header nào
  return null;
};

// Xác thực: verify access token và gắn payload vào req.user
// Thành công -> next(); Thất bại -> 401
const authenticate = (req, res, next) => {
  try {
    // Cố gắng lấy token từ request
    const token = getTokenFromRequest(req);
    // Nếu không có token -> 401 (Unauthorized)
    if (!token) {
      return res.status(401).json({ status: "ERROR", message: "Thiếu token truy cập" });
    }

    // Xác thực chữ ký và hạn token, lấy ra payload
    const payload = verifyAccessToken(token);
    // Gắn payload lên req để các middleware/handler sau có thể dùng
    req.user = payload; // { userId, email, isAdmin }
    // Cho phép đi tiếp
    return next();
  } catch (err) {
    // Bất kỳ lỗi verify nào (sai chữ ký, hết hạn, token hỏng, ...) -> 401
    return res
      .status(401)
      .json({ status: "ERROR", message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// Phân quyền: chỉ cho phép admin
// - Nếu chưa xác thực -> 401
// - Nếu đã xác thực nhưng không phải admin -> 403
const authorizeAdmin = (req, res, next) => {
  // Nếu chưa có req.user nghĩa là chưa qua authenticate
  if (!req.user) {
    return res.status(401).json({ status: "ERROR", message: "Chưa xác thực người dùng" });
  }
  // Nếu đã xác thực nhưng không có cờ isAdmin
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ status: "ERROR", message: "Chỉ admin mới có quyền thực hiện thao tác này" });
  }
  // OK, là admin -> cho phép tiếp tục
  return next();
};

// Cho phép truy cập nếu là chính user theo :id hoặc là admin
const authorizeSelfOrAdmin = (req, res, next) => { // Middleware: cho phép nếu là chính user (:id) hoặc admin
  // Yêu cầu đã authenticate trước để có req.user
  if (!req.user) { // Chưa có thông tin user từ token
    return res.status(401).json({ status: "ERROR", message: "Chưa xác thực người dùng" }); // 401: chưa đăng nhập/thiếu token
  }

  const requestedUserId = req.params?.id; // ID user đang được yêu cầu truy cập (từ URL)
  const authenticatedUserId = req.user?.userId; // ID user lấy từ token đã xác thực

  // Admin thì cho qua luôn
  if (req.user.isAdmin) { // Nếu là admin
    return next(); // Bỏ qua kiểm tra tiếp theo
  }

  // Không phải admin thì chỉ được xem chính mình
  if (requestedUserId && authenticatedUserId && requestedUserId === authenticatedUserId) { // So sánh :id với userId trong token
    return next(); // Truy cập hợp lệ: chính chủ
  }

  return res.status(403).json({ // 403: đã đăng nhập nhưng không đủ quyền
    status: "ERROR",
    message: "Bạn không có quyền truy cập thông tin người dùng này",
  });
};

module.exports = {
  authenticate,
  authorizeAdmin,
  authorizeSelfOrAdmin,
};
