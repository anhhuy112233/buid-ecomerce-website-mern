import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, message } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  LoginOutlined,
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
 * SignInPage Component
 * 
 * Trang đăng nhập cho người dùng
 * - Xử lý form đăng nhập với email và password
 * - Tích hợp với React Query để quản lý API calls
 * - Validation form trước khi gửi request
 * - Lưu trữ token và thông tin user vào localStorage
 * - Chuyển hướng sau khi đăng nhập thành công
 */
const SignInPage = () => {
  // ===== HOOKS =====
  const navigate = useNavigate(); // Hook để điều hướng trang

  // ===== STATE MANAGEMENT =====
  // State quản lý hiển thị/ẩn mật khẩu
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  // State lưu trữ thông tin đăng nhập
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State quản lý validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ===== MUTATION HOOK =====
  // Sử dụng React Query để quản lý API call đăng nhập
  // mutation sẽ chứa: isPending, isError, error, data, mutate
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  // ===== EVENT HANDLERS =====
  
  /**
   * Xử lý chuyển hướng đến trang đăng ký
   */
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  /**
   * Xử lý toggle hiển thị/ẩn mật khẩu
   * Khi click vào icon mắt, sẽ chuyển đổi giữa type="text" và type="password"
   */
  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
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
   * Validation toàn bộ form
   * @returns {boolean} - True nếu form hợp lệ
   */
  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    // Kiểm tra email
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    // Kiểm tra password
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Xử lý sự kiện đăng nhập
   * Validation form và gọi API đăng nhập
   */
  const handleSignIn = () => {
    // Validation form trước khi gửi
    if (!validateForm()) {
      return;
    }

    // Gọi mutation để thực hiện API call
    // mutation.mutate() sẽ trigger API call và cập nhật state
    mutation.mutate({
      email,
      password,
    });
    
    console.log("Đang đăng nhập với:", { email, password });
  };

  // ===== SIDE EFFECTS =====
  
  /**
   * useEffect xử lý kết quả đăng nhập
   * Chạy khi mutation.data thay đổi (sau khi API call hoàn thành)
   */
  useEffect(() => {
    if (mutation.data) {
      if (mutation.data.status === "OK") {
        // Đăng nhập thành công
        message.success("Đăng nhập thành công!");
        
        // Lưu thông tin user vào localStorage để duy trì session
        const userData = mutation.data.data;
        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Chuyển hướng về trang chủ
        navigate("/");
        
      } else if (mutation.data.status === "ERROR") {
        // Đăng nhập thất bại - hiển thị lỗi từ server
        if (mutation.data.message.includes("Email hoặc mật khẩu không đúng")) {
          setErrors(prev => ({ 
            ...prev, 
            email: "Email hoặc mật khẩu không đúng",
            password: "Email hoặc mật khẩu không đúng"
          }));
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
      console.error("Lỗi đăng nhập:", mutation.error);
      message.error("Đăng nhập thất bại. Vui lòng thử lại!");
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
      {/* Container chính chứa form đăng nhập */}
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "500px", // Tăng chiều cao để chứa error messages
          borderRadius: "6px",
          backgroundColor: "#fff",
        }}
      >
        {/* Phần bên trái - Form đăng nhập */}
        <WrapperContainerLeft>
          {/* Header */}
          <h1>Xin chào!</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          
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
          
          {/* Button đăng nhập với loading state */}
          <ButtonComponent
            disabled={!email.length || !password.length || mutation.isPending}
            onClick={handleSignIn}
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
            {mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </ButtonComponent>
          
          {/* Links hỗ trợ */}
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản{" "}
            <WrapperTextLight
              onClick={handleNavigateSignUp}
              style={{ cursor: "pointer" }}
            >
              Tạo tài khoản
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

export default SignInPage;
