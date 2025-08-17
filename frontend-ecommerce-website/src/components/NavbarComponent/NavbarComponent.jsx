import React from "react";
import {
  WrapperLableText,
  WrapperTextValue,
  WrapperContent,
  WrapperTextPrice,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
  const onChange = () => {};
  const RenderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => (
              <Checkbox value={option.value}>{option.label}</Checkbox>
            ))}
          </Checkbox.Group>
        );
      case "star":
        return (
          <>
            {options.map((option, idx) => (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Rate
                  style={{ fontSize: "12px" }}
                  disabled
                  defaultValue={option}
                />
                <span>từ {option} sao</span>
              </div>
            ))}
          </>
        );
      case "price":
        return (
          <>
            {options.map((option, idx) => {
              return <WrapperTextPrice>{option}</WrapperTextPrice>;
            })}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <WrapperLableText style={{}}>Lable</WrapperLableText>
      <WrapperContent>
        {RenderContent("text", ["Tu Lanh", "TV", "Dieu Hoa"])}
      </WrapperContent>
      <WrapperLableText style={{}}>Lable</WrapperLableText>
      <WrapperContent>
        {RenderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" },
        ])}
      </WrapperContent>
      <WrapperLableText style={{}}>Lable</WrapperLableText>
      <WrapperContent>{RenderContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperLableText style={{}}>Lable</WrapperLableText>
      <WrapperContent>
        {RenderContent("price", [10000, 20000, 30000])}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
