import React from "react";
import { Image } from "antd";
import {
  WrapperCartStyle,
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
} from "./style";
import { StarFilled } from "@ant-design/icons";

import logo from "../../assets/images/logo.jpg";

const CardComponent = () => {
  return (
    <WrapperCartStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <img
        src={logo}
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: "-1px",
          left: "-1px",
          borderTopLeftRadius: "3px",
        }}
      />
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>4.9</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <span> | đã bán 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CardComponent;
