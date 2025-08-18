import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperProducts, WrapperNavbar } from "./style";

import { Row, Col, Pagination } from "antd";

const TypeProductPage = () => {
  const onChange = (page, pageSize) => {
    console.log("Current page:", page);
    console.log("Page size:", pageSize);
    // Thêm logic xử lý khi thay đổi trang ở đây
  };
  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <WrapperNavbar span={4}>
            <NavbarComponent />
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts>
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </WrapperProducts>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
                padding: "10px",
              }}
            >
              <Pagination
                defaultCurrent={2}
                total={100}
                onChange={onChange}
                showSizeChanger={false}
                style={{ display: "block" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
