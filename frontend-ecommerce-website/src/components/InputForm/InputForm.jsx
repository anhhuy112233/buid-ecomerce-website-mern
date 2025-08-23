import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  // Destructure props, loại bỏ các prop không hợp lệ cho DOM
  const { 
    placeholder = "Nhập text", 
    value, 
    handleOnchange, 
    style,
    type,
    ...rest 
  } = props;
  
  const handleOnchangeInput = (e) => {
    // Gọi hàm callback từ parent component
    if (handleOnchange) {
      handleOnchange(e.target.value);
    }
  }
  
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={value}
      type={type}
      style={style}
      onChange={handleOnchangeInput}
      {...rest}
    />
  );
};

export default InputForm;
