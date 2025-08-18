import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  WrapperButtonMore,
  WrapperButtonMoreContainer,
  WrapperTypeProduct,
  WrapperProducts,
} from "./style";
import slider1 from "../../assets/images/Slider1.jpg";
import slider2 from "../../assets/images/Slider2.jpg";
import slider3 from "../../assets/images/Slider3.jpg";
import slider4 from "../../assets/images/Slider4.jpg";

const HomePage = () => {
  const arr = ["TV", "Dien thoai", "Laptop"];
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "efefef" }}
      >
        <div
          id="container"
          style={{
            backgroundColor: "#efefef",
            width: "1270px",
            margin: "0 auto",
            height: "1000px",
          }}
        >
          <div>
            <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
          </div>
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
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <WrapperButtonMoreContainer>
            <WrapperButtonMore
              textButton="Xem Thêm"
              type="outline"
              style={{
                border: "1px solid rgb(11, 116, 299)",
                color: "rgb(11,116,299)",
                width: "240px",
                height: "38px",
                fontWeight: "500",
                borderRadius: "4px",
                transition: "background-color 0.5s ease, transform 0.5s ease",
              }}
            />
          </WrapperButtonMoreContainer>
        </div>
      </div>
    </>
  );
};

export default HomePage;
