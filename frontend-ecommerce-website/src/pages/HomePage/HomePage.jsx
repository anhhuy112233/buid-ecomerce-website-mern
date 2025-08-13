import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { WrapperTypeProduct } from "./style";
import slider1 from "../../assets/images/Slider1.jpg";
import slider2 from "../../assets/images/Slider2.jpg";
import slider3 from "../../assets/images/Slider3.jpg";
import slider4 from "../../assets/images/Slider4.jpg";

const HomePage = () => {
  const arr = ["TV", "Dien thoai", "Laptop"];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{ backgroundColor: "#efefef", padding: "0 120px" }}
      >
        <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
      </div>
    </>
  );
};

export default HomePage;
