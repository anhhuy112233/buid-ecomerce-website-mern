import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    variant,
    backgroundColorInput = "#fff",
    backgroundColor = "rgb(12, 92, 182)",
    colorButton = "#fff",
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        variant={variant}
        style={{ backgroundColor: backgroundColorInput, borderRadius: "0" }}
      />
      <ButtonComponent
        size={size}
        variant={variant}
        style={{
          backgroundColor: backgroundColor,
          color: colorButton,
          borderRadius: "0",
        }}
        icon={<SearchOutlined />}
      >
        {textButton}
      </ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
