import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px !important;
  width: 64px !important;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const WrapperStyleColImage = styled(Col)`
  display: flex;
  flex-basis: unset !important;
`;

export const WrapperNameStyleProduct = styled.h1`
  color: rgb(36, 36 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
  word-break: break-worl;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;
export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  padding: 10px;
  margin-top: 10px;
`;

export const WrapperAdderssProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 15px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsisl;
  }

  span.chane-address {
    font-size: 16px;
    line-height: 15px;
    font-weight: 500;
    color: rgb(11, 116, 229);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsisl;
  }
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
`;

export const WrapperBtnQualityProduct = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const WrapperInputNumber = styled(InputNumber)`
  width: 50px !important;
  text-align: center !important;
  
  .ant-input-number-input {
    text-align: center !important;
  }

  .ant-input-number-handler-wrap {
    display: none !important;
  }
`;
