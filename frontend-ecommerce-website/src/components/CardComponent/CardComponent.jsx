import React from "react";
import { Image } from "antd";
import {
  WrapperCartStyle,
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";

import logo from "../../assets/images/logo.jpg";

const CardComponent = () => {
  return (
    <WrapperCartStyle
      hoverable
      styles={{
        header: { width: "200px", height: "200px" },
        body: { padding: "10px" }
      }}
      style={{ width: 200 }}
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
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
        </span>
        <WrapperStyleTextSell> | đã bán 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>25.000.000</span>
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CardComponent;
