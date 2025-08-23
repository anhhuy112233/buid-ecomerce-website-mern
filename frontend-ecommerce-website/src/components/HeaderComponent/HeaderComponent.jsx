import React from "react";
import { Col } from "antd";
import Search from "antd/es/transfer/search";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate()
  const handleNavigateSignIn = () => {
    navigate("/sign-in")
  }
  return (
    <div style={{width: "100%", background: "rgb(26, 148, 255)", display: "flex", justifyContent: "center"}}>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>NOVATEACH</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Input search text"
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            <div onClick={handleNavigateSignIn} style={{cursor: "pointer"}}>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <Badge count={5} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "25px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
