// Controller tiếp nhận request/response cho tài nguyên User
// Thực tế controller sẽ gọi xuống Service để xử lý nghiệp vụ và thao tác DB.
// Ở giai đoạn học luồng, ta trả về chính payload để dễ thấy dữ liệu đi qua.

const UserService = require("../services/UserService");

// [POST] /api/users
// Nhận dữ liệu người dùng từ client và trả về JSON xác nhận
// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body - nội dung yêu cầu
    const { name, email, password, confirmPassword, phone } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Thiếu thông tin bắt buộc",
        data: req.body,
      });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = emailRegex.test(email);

    if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "Email không đúng định dạng",
        data: { email },
      });
    }

    // Kiểm tra password và confirmPassword có giống nhau không
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mật khẩu xác nhận không khớp",
        data: { password, confirmPassword },
      });
    }

    // Kiểm tra độ dài password (tối thiểu 6 ký tự)
    if (password.length < 6) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mật khẩu phải có ít nhất 6 ký tự",
        data: { passwordLength: password.length },
      });
    }

    // Nếu validation pass, gọi service để tạo user
    console.log("Validation passed, creating user:", { name, email, phone });

    const result = await UserService.createUser(req.body);
    return res.status(201).json(result);
  } catch (e) {
    console.error("Error in createUser:", e);

    // Xử lý lỗi từ service
    if (e.message.includes("Email đã tồn tại")) {
      return res.status(400).json({
        status: "ERROR",
        message: e.message,
      });
    }

    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [POST] /api/users
// Nhận dữ liệu người dùng từ client và trả về JSON xác nhận
// Đăng nhập với tài khoản của người dùng
const loginUser = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body - nội dung yêu cầu
    const { name, email, password, confirmPassword, phone } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Thiếu thông tin bắt buộc",
        data: req.body,
      });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = emailRegex.test(email);

    if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "Email không đúng định dạng",
        data: { email },
      });
    }

    // Kiểm tra password và confirmPassword có giống nhau không
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mật khẩu xác nhận không khớp",
        data: { password, confirmPassword },
      });
    }

    // Kiểm tra độ dài password (tối thiểu 6 ký tự)
    if (password.length < 6) {
      return res.status(400).json({
        status: "ERROR",
        message: "Mật khẩu phải có ít nhất 6 ký tự",
        data: { passwordLength: password.length },
      });
    }

    // Nếu validation pass, gọi service để tạo user
    console.log("Validation passed, creating user:", { name, email, phone });

    const result = await UserService.loginUser(req.body);
    return res.status(201).json(result);
  } catch (e) {
    console.error("Error in createUser:", e);

    // Xử lý lỗi từ service
    if (e.message.includes("Email đã tồn tại")) {
      return res.status(400).json({
        status: "ERROR",
        message: e.message,
      });
    }

    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [PUT] /api/users
// Nhận dữ liệu người dùng từ client và trả về JSON xác nhận
// Cập nhật lại thông tin của người dùng
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    console.log("userId", userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: e?.message || "The userId is required",
      });
    }
    const result = await UserService.updateUser(userId, data);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in createUser:", e);

    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [DELETE] /api/users
// Nhận dữ liệu người dùng từ client và trả về JSON xác nhận
// Xoá người dùng
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Thiếu tham số userId",
      });
    }

    const result = await UserService.deleteUser(userId);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in deleteUser:", e);

    if (e.statusCode === 400) {
      return res.status(400).json({ status: "ERROR", message: e.message });
    }
    if (e.statusCode === 404 || e.message?.includes("Không tìm thấy")) {
      return res.status(404).json({ status: "ERROR", message: e.message });
    }

    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [GET] /api/users
// Lấy danh sách tất cả users
const getAllUsers = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getAllUsers:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [GET] /api/users/:id
// Lấy thông tin user theo ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.getUserById(id);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getUserById:", e);

    if (e.message.includes("Không tìm thấy")) {
      return res.status(404).json({
        status: "ERROR",
        message: e.message,
      });
    }

    return res.status(500).json({
      status: "ERROR",
      message: e?.message || "Lỗi server",
    });
  }
};

// [POST] /api/users/refresh-token
// Cấp mới access_token từ refresh_token
const refreshToken = async (req, res) => {
  try {
    // Ưu tiên lấy từ body
    let refreshTokenInput = req.body?.refresh_token;

    // Nếu không có trong body, thử lấy từ Authorization: Bearer <refresh_token>
    if (!refreshTokenInput) {
      const authHeader = req.headers["authorization"] || req.headers["Authorization"];
      if (authHeader && typeof authHeader === "string") {
        const parts = authHeader.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
          refreshTokenInput = parts[1];
        }
      }
    }

    // Nếu vẫn chưa có, fallback header 'token' (có thể kèm Bearer)
    if (!refreshTokenInput) {
      const headerToken = req.headers["token"];
      if (headerToken && typeof headerToken === "string") {
        refreshTokenInput = headerToken.startsWith("Bearer ")
          ? headerToken.slice(7)
          : headerToken;
      }
    }

    if (!refreshTokenInput) {
      return res.status(400).json({ status: "ERROR", message: "Thiếu refresh token" });
    }

    const result = await UserService.refreshAccessToken(refreshTokenInput);
    return res.status(200).json(result);
  } catch (e) {
    const status = e.statusCode || 500;
    return res
      .status(status)
      .json({ status: "ERROR", message: e.message || "Lỗi server" });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  refreshToken,
};
