import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, message } from "antd";
import {
  LoginOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";

// Import components
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

// Import styles
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";

// Import services and hooks
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";

// Import assets
import imageLogo from "../../assets/images/tiki.png";

/**
 * SignUpPage Component
 * 
 * Trang đăng ký cho người dùng mới
 * - Xử lý form đăng ký với đầy đủ thông tin: name, email, password, confirmPassword, phone
 * - Tích hợp với React Query để quản lý API calls
 * - Validation form trước khi gửi request
 * - Chuyển hướng sau khi đăng ký thành công
 */
const SignUpPage = () => {
  // ===== HOOKS =====
  const navigate = useNavigate(); // Hook để điều hướng trang

  // ===== STATE MANAGEMENT =====
  // State quản lý hiển thị/ẩn mật khẩu
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  
  // State lưu trữ thông tin đăng ký
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // State quản lý validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // ===== MUTATION HOOK =====
  // Sử dụng React Query để quản lý API call đăng ký
  const mutation = useMutationHooks((data) => UserService.signUpUser(data));

  // ===== EVENT HANDLERS =====
  
  /**
   * Xử lý chuyển hướng đến trang đăng nhập
   */
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  /**
   * Xử lý toggle hiển thị/ẩn mật khẩu
   */
  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  /**
   * Xử lý toggle hiển thị/ẩn xác nhận mật khẩu
   */
  const handleToggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  /**
   * Xử lý thay đổi giá trị tên
   * @param {string} value - Giá trị tên mới từ InputForm
   */
  const handleOnChangeName = (value) => {
    setName(value);
    // Clear error khi user bắt đầu nhập
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: "" }));
    }
  };

  /**
   * Xử lý thay đổi giá trị email
   * @param {string} value - Giá trị email mới từ InputForm
   */
  const handleOnChangeEmail = (value) => {
    setEmail(value);
    // Clear error khi user bắt đầu nhập
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  /**
   * Xử lý thay đổi giá trị password
   * @param {string} value - Giá trị password mới từ InputForm
   */
  const handleOnChangePassword = (value) => {
    setPassword(value);
    // Clear error khi user bắt đầu nhập
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
    // Clear confirm password error nếu password thay đổi
    if (errors.confirmPassword && value === confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  /**
   * Xử lý thay đổi giá trị xác nhận password
   * @param {string} value - Giá trị xác nhận password mới từ InputForm
   */
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
    // Clear error khi user bắt đầu nhập
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  /**
   * Xử lý thay đổi giá trị số điện thoại
   * @param {string} value - Giá trị số điện thoại mới từ InputForm
   */
  const handleOnChangePhone = (value) => {
    setPhone(value);
    // Clear error khi user bắt đầu nhập
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  /**
   * Validation email format
   * @param {string} email - Email cần kiểm tra
   * @returns {boolean} - True nếu email hợp lệ
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  /**
   * Validation số điện thoại (chỉ chấp nhận số)
   * @param {string} phone - Số điện thoại cần kiểm tra
   * @returns {boolean} - True nếu số điện thoại hợp lệ
   */
  const validatePhone = (phone) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  /**
   * Validation toàn bộ form
   * @returns {boolean} - True nếu form hợp lệ
   */
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    };

    let isValid = true;

    // Kiểm tra name
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
      isValid = false;
    }

    // Kiểm tra email
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    // Kiểm tra phone
    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (tối thiểu 10 số)";
      isValid = false;
    }

    // Kiểm tra password
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    // Kiểm tra confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Xử lý sự kiện đăng ký
   * Validation form và gọi API đăng ký
   */
  const handleSignUp = () => {
    // Validation form trước khi gửi
    if (!validateForm()) {
      return;
    }

    // Gọi mutation để thực hiện API call
    mutation.mutate({
      name,
      email,
      password,
      confirmPassword,
      phone: parseInt(phone), // Chuyển string thành number vì backend expect number
    });
    
    console.log("Đang đăng ký với:", { name, email, phone });
  };

  // ===== SIDE EFFECTS =====
  
  /**
   * useEffect xử lý kết quả đăng ký
   * Chạy khi mutation.data thay đổi (sau khi API call hoàn thành)
   */
  useEffect(() => {
    if (mutation.data) {
      if (mutation.data.status === "OK") {
        // Đăng ký thành công
        message.success("Đăng ký thành công! Vui lòng đăng nhập.");
        
        // Lưu thông tin user vào localStorage (tùy chọn)
        const userData = mutation.data.data;
        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Chuyển hướng về trang đăng nhập
        navigate("/sign-in");
        
      } else if (mutation.data.status === "ERROR") {
        // Đăng ký thất bại - hiển thị lỗi từ server
        if (mutation.data.message.includes("Email đã tồn tại")) {
          setErrors(prev => ({ ...prev, email: "Email đã tồn tại trong hệ thống" }));
        } else {
          message.error(mutation.data.message);
        }
      }
    }
  }, [mutation.data, navigate]);

  /**
   * useEffect xử lý lỗi network/API
   * Chạy khi mutation.error thay đổi (khi có lỗi xảy ra)
   */
  useEffect(() => {
    if (mutation.error) {
      console.error("Lỗi đăng ký:", mutation.error);
      message.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  }, [mutation.error]);

  // ===== RENDER =====
  return (
    // Container chính - full screen với background overlay
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      {/* Container chính chứa form đăng ký */}
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "650px", // Tăng chiều cao để chứa error messages
          borderRadius: "6px",
          backgroundColor: "#fff",
        }}
      >
        {/* Phần bên trái - Form đăng ký */}
        <WrapperContainerLeft>
          {/* Header */}
          <h1>Xin chào!</h1>
          <p>Đăng ký tài khoản!</p>
          
          {/* Input tên */}
          <InputForm
            style={{ marginBottom: "5px" }}
            placeholder="Họ và tên"
            value={name}
            handleOnchange={handleOnChangeName}
          />
          {errors.name && (
            <div style={{ 
              color: "#ff4d4f", 
              fontSize: "12px", 
              marginBottom: "10px",
              marginTop: "0"
            }}>
              {errors.name}
            </div>
          )}
          
          {/* Input email */}
          <InputForm
            style={{ marginBottom: "5px" }}
            placeholder="abc@gmail.com"
            value={email}
            handleOnchange={handleOnChangeEmail}
          />
          {errors.email && (
            <div style={{ 
              color: "#ff4d4f", 
              fontSize: "12px", 
              marginBottom: "10px",
              marginTop: "0"
            }}>
              {errors.email}
            </div>
          )}
          
          {/* Input số điện thoại */}
          <InputForm
            style={{ marginBottom: "5px" }}
            placeholder="Số điện thoại"
            value={phone}
            handleOnchange={handleOnChangePhone}
          />
          {errors.phone && (
            <div style={{ 
              color: "#ff4d4f", 
              fontSize: "12px", 
              marginBottom: "10px",
              marginTop: "0"
            }}>
              {errors.phone}
            </div>
          )}
          
          {/* Input password với icon toggle */}
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              style={{ marginBottom: "5px" }}
              value={password}
              handleOnchange={handleOnChangePassword}
            />
            
            {/* Icon toggle hiển thị/ẩn password */}
            <span
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "8px",
                cursor: "pointer",
              }}
              onClick={handleTogglePassword}
            >
              {isShowPassword ? (
                <EyeFilled style={{ fontSize: "16px", color: "#666" }} />
              ) : (
                <EyeInvisibleFilled
                  style={{ fontSize: "16px", color: "#666" }}
                />
              )}
            </span>
          </div>
          {errors.password && (
            <div style={{ 
              color: "#ff4d4f", 
              fontSize: "12px", 
              marginBottom: "10px",
              marginTop: "0"
            }}>
              {errors.password}
            </div>
          )}
          
          {/* Input xác nhận password với icon toggle */}
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Xác nhận mật khẩu"
              type={isShowConfirmPassword ? "text" : "password"}
              style={{ marginBottom: "5px" }}
              value={confirmPassword}
              handleOnchange={handleOnChangeConfirmPassword}
            />
            
            {/* Icon toggle hiển thị/ẩn confirm password */}
            <span
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "8px",
                cursor: "pointer",
              }}
              onClick={handleToggleConfirmPassword}
            >
              {isShowConfirmPassword ? (
                <EyeFilled style={{ fontSize: "16px", color: "#666" }} />
              ) : (
                <EyeInvisibleFilled
                  style={{ fontSize: "16px", color: "#666" }}
                />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <div style={{ 
              color: "#ff4d4f", 
              fontSize: "12px", 
              marginBottom: "10px",
              marginTop: "0"
            }}>
              {errors.confirmPassword}
            </div>
          )}
          
          {/* Button đăng ký với loading state */}
          <ButtonComponent
            disabled={
              !name.length || 
              !email.length || 
              !password.length || 
              !confirmPassword.length || 
              !phone.length ||
              mutation.isPending
            }
            onClick={handleSignUp}
            size="large"
            style={{
              backgroundColor: "#1a95ff",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              height: "48px",
              width: "100%",
              padding: "0 24px",
              margin: "26px 0 10px",
            }}
            icon={<LoginOutlined />}
          >
            {mutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
          </ButtonComponent>
          
          {/* Link chuyển đến đăng nhập */}
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight
              onClick={handleNavigateSignIn}
              style={{ cursor: "pointer" }}
            >
              Đăng nhập tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        
        {/* Phần bên phải - Logo và branding */}
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="Image-Logo"
            height="300px"
            width="300px"
          />
          <h4>Mua sắm tại NovaTeach</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
