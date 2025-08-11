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

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <WrapperTextHeader>NOVATEACH</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            Size="large"
            textButton="Tìm kiếm"
            placeholder="Input search text"
          />
        </Col>
        <Col span={6} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "25px" }} />
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <ShoppingCartOutlined style={{ fontSize: "25px", color: "#fff" }} />
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
