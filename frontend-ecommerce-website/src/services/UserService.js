import axios from "axios";

/**
 * Service xử lý các API liên quan đến User
 * Sử dụng axios để gọi HTTP requests đến backend
 */

/**
 * Đăng nhập người dùng
 * @param {Object} data - Dữ liệu đăng nhập
 * @param {string} data.email - Email người dùng
 * @param {string} data.password - Mật khẩu người dùng
 * @returns {Promise<Object>} Response từ server chứa thông tin user và tokens
 */
export const loginUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/users/sign-in`,
    data
  );
  // Trả về dữ liệu từ response (res.data chứa dữ liệu thực tế)
  return res.data;
};

/**
 * Đăng ký người dùng mới
 * @param {Object} data - Dữ liệu đăng ký
 * @param {string} data.name - Tên người dùng
 * @param {string} data.email - Email người dùng
 * @param {string} data.password - Mật khẩu
 * @param {string} data.confirmPassword - Xác nhận mật khẩu
 * @param {string} data.phone - Số điện thoại
 * @returns {Promise<Object>} Response từ server chứa thông tin user đã tạo
 */
export const signUpUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/users/sign-up`,
    data
  );
  return res.data;
};
