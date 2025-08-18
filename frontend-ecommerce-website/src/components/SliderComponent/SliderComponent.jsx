import React from "react";
import { Image } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WrapperSliderStyle, SliderContainer } from "./style";

const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };
  
  return (
    <SliderContainer>
      <WrapperSliderStyle {...settings}>
        {arrImages.map((image, index) => {
          return (
            <div key={index}>
              <Image
                src={image}
                alt={`slider-${index}`}
                preview={false}
              />
            </div>
          );
        })}
      </WrapperSliderStyle>
    </SliderContainer>
  );
};

export default SliderComponent;
