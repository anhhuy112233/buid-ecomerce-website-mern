import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColor = "rgb(12, 92, 182",
    colorButton = "#fff",
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <Input
        size={size}
        placeholder={placeholder}
        bordered={false}
        style={{ backgroundColor: backgroundColorInput, borderRadius: "none" }}
      />
      <Button
        size={size}
        bordered={bordered}
        style={{ backgroundColor: backgroundColor, color: colorButton, borderRadius: "0" }}
        icon={<SearchOutlined />}
      >
        {textButton}
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
