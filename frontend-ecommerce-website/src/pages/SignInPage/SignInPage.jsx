import React, { useState } from "react";

import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  EyeFilled,
  EyeInvisibleFilled,
  LoginOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import imageLogo from "../../assets/images/tiki.png";

const SignInPage = () => {
  const [isShowPassWord, setIsShowPassWord] = useState(false);

  const handleTogglePassword = () => {
    setIsShowPassWord(!isShowPassWord);
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
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
          />
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassWord ? "text" : "password"}
              style={{ marginBottom: "10px" }}
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
              {isShowPassWord ? (
                <EyeFilled style={{ fontSize: "16px", color: "#666" }} />
              ) : (
                <EyeInvisibleFilled
                  style={{ fontSize: "16px", color: "#666" }}
                />
              )}
            </span>
          </div>
          <ButtonComponent
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
            Đăng nhập
          </ButtonComponent>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản <WrapperTextLight>Tạo tài khoản</WrapperTextLight>
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

export default SignInPage;
