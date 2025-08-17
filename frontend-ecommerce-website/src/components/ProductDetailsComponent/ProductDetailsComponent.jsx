import { Row, Col, Image } from "antd";
import React from "react";
import imageProduct from "../../assets/images/dienthoai.webp";
import imageProductSmall from "../../assets/images/dienthoaiss.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperNameStyleProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAdderssProduct,
  WrapperInputNumber,
  WrapperQualityProduct,
  WrapperBtnQualityProduct,
} from "./style";
import {
  StarFilled,
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const ProductDetailsComponent = () => {
  const onChange = () => {};
  return (
    <Row
      style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "10px" }}
      >
        <Image src={imageProduct} alt="image product " preview={false} style={{borderRadius: "8px"}}/>
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image product "
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperNameStyleProduct>
          Điện thoại sam sung galaxy S25 ULTRAL 5G - 12/256GB | 12/512GB
        </WrapperNameStyleProduct>
        <div>
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <WrapperStyleTextSell> | đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>25.000.000</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAdderssProduct>
          <span>Giao đến </span>
          <span className="address">Bắc từ liêm, Hà Nội</span> -
          <span className="chane-address"> Đổi địa chỉ</span>
        </WrapperAdderssProduct>
        <div>
          <div>Số lượng</div>
          <WrapperQualityProduct>
            <WrapperBtnQualityProduct>
              <MinusOutlined style={{ fontSize: "16px" }} />
            </WrapperBtnQualityProduct>
            <WrapperInputNumber
              defaultValue={1}
              onChange={onChange}
              size="middle"
            />
            <WrapperBtnQualityProduct>
              <PlusOutlined style={{ fontSize: "16px" }} />
            </WrapperBtnQualityProduct>
          </WrapperQualityProduct>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <ButtonComponent
            size="large"
            style={{
              backgroundColor: "#1a95ff",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              height: "48px",
              width: "220px",
              padding: "0 24px",
            }}
            icon={<ShoppingCartOutlined />}
          >
            Chọn mua
          </ButtonComponent>

          <ButtonComponent
            size="large"
            style={{
              backgroundColor: "#fff",
              color: "#1a95ff",
              borderRadius: "4px",
              border: "1px solid #1a95ff",
              height: "48px",
              width: "220px",
              padding: "0 24px",
            }}
            icon={<HeartOutlined />}
          >
            Thêm vào giỏ hàng
          </ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
