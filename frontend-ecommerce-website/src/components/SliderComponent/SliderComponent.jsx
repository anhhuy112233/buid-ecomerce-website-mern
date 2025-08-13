import React from "react";
import Slider from "react-slick";
import { Image } from "antd";

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
    <div style={{ margin: "0 0" }}>
      <Slider {...settings}>
        {arrImages.map((image, index) => {
          return (
            <div key={index}>
              <Image 
                src={image} 
                alt={`slider-${index}`} 
                preview={false} 
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
