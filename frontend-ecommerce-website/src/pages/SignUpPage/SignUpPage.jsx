import React, { useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  LoginOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { Image } from "antd";
import imageLogo from "../../assets/images/tiki.png";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const [email, setEmail] = useState("");
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  // Thêm state cho password
  const [password, setPassword] = useState("");
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  // Thêm state cho confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  // // Debug: Log ra state để kiểm tra
  // console.log("Current states:", { email, password, confirmPassword });
  // console.log("Button disabled:", !email.length || !password.length || !confirmPassword.length);

  const handleSignUp = () => {
    console.log("sign-up", email, password, confirmPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào!</h1>
          <p>Đăng ký tài khoản!</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            handleOnchange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              style={{ marginBottom: "10px" }}
              value={password}
              handleOnchange={handleOnchangePassword}
            />
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
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Xác nhận mật khẩu"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              handleOnchange={handleOnchangeConfirmPassword}
            />
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
          <ButtonComponent
            disabled={
              !email.length || !password.length || !confirmPassword.length
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
            Đăng ký
          </ButtonComponent>
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
