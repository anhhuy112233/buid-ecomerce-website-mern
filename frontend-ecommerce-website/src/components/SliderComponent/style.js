
import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    & .slick-arrow {
        z-index: 10;
        height: 44px;
        width: 44px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        
        &:hover {
            background: #fff;
            transform: scale(1.1);
        }
        
        &:before {
            font-size: 20px;
            color: #000;
        }
    }
    
    & .slick-prev {
        left: 10px;
    }
    
    & .slick-next {
        right: 10px;
    }
    
    & .slick-dots {
        bottom: 20px;
        
        li {
            button {
                &:before {
                    color: #fff;
                    font-size: 12px;
                }
            }
            
            &.slick-active button:before {
                color: #fff;
            }
        }
    }
    
    & .slick-slide {
        div {
            outline: none;
        }
    }
    
    @media (max-width: 768px) {
        & .slick-arrow {
            height: 36px;
            width: 36px;
            
            &:before {
                font-size: 16px;
            }
        }
        
        & .slick-prev {
            left: 5px;
        }
        
        & .slick-next {
            right: 5px;
        }
    }
`;

export const SliderContainer = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    
    .ant-image {
        width: 100%;
        height: 247px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    @media (max-width: 768px) {
        .ant-image {
            height: 200px;
        }
    }
    
    @media (max-width: 480px) {
        .ant-image {
            height: 150px;
        }
    }
`;
