const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("./JwtService");
const mongoose = require("mongoose");

// Tạo mới người dùng
const createUser = async (userData) => {
  try {
    const { name, email, password, confirmPassword, phone } = userData;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email đã tồn tại trong hệ thống");
    }

    // Hash password trước khi lưu vào database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Khởi tạo user (Mongoose cấp _id trước khi save)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      phone,
    });

    // Tạo JWT token
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    newUser.access_token = accessToken;
    newUser.refresh_token = refreshToken;

    // Lưu user
    await newUser.save();

    // Trả về user đã tạo (không bao gồm password)
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      phone: newUser.phone,
      access_token: newUser.access_token,
      refresh_token: newUser.refresh_token,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return {
      status: "OK",
      message: "Tạo user thành công",
      data: userResponse,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email đã tồn tại trong hệ thống");
    }

    throw error;
  }
};

// Đăng nhập người dùng
const loginUser = async (userLogin) => {
  try {
    const { email, password } = userLogin;

    // Tìm user theo email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // So sánh mật khẩu
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Tạo và cập nhật JWT mỗi lần đăng nhập
    existingUser.access_token = generateAccessToken(existingUser);
    existingUser.refresh_token = generateRefreshToken(existingUser);
    await existingUser.save();

    const userResponse = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      phone: existingUser.phone,
      access_token: existingUser.access_token,
      refresh_token: existingUser.refresh_token,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    return {
      status: "OK",
      message: "Đăng nhập thành công",
      data: userResponse,
    };
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (userId, data) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Không tìm thấy user");
    }

    const updateUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    console.log("updateUser", updateUser);

    return {
      status: "OK",
      message: "Lấy thông tin user thành công",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

// Xóa người dùng
const deleteUser = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("ID người dùng không hợp lệ");
      error.statusCode = 400;
      throw error;
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      const error = new Error("Không tìm thấy user");
      error.statusCode = 404;
      throw error;
    }

    return {
      status: "OK",
      message: "Xoá user thành công",
    };
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách tất cả users (không bao gồm password)
const getAllUsers = async () => {
  try {
    const users = await User.find({}).select("-password");
    return {
      status: "OK",
      message: "Lấy danh sách users thành công",
      data: users,
    };
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin user theo ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Không tìm thấy user");
    }

    return {
      status: "OK",
      message: "Lấy thông tin user thành công",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

// Cấp mới access_token (và xoay refresh_token) từ refresh_token hợp lệ
const refreshAccessToken = async (refreshTokenInput) => {
  try {
    if (!refreshTokenInput) {
      const error = new Error("Thiếu refresh token");
      error.statusCode = 400;
      throw error;
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshTokenInput);
    } catch (e) {
      const error = new Error("Refresh token không hợp lệ hoặc đã hết hạn");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      const error = new Error("Không tìm thấy user");
      error.statusCode = 404;
      throw error;
    }

    if (user.refresh_token !== refreshTokenInput) {
      const error = new Error("Refresh token không khớp");
      error.statusCode = 401;
      throw error;
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.access_token = newAccessToken;
    user.refresh_token = newRefreshToken;
    await user.save();

    return {
      status: "OK",
      message: "Cấp token mới thành công",
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  refreshAccessToken,
};
