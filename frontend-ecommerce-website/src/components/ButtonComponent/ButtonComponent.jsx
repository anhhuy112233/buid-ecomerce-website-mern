import React from "react";
import { Button } from "antd";

const ButtonComponent = ({
  size,
  variant,
  style,
  styleButton,
  icon,
  children,
  textButton,
  type,
  disabled,
  ...rest
}) => {
  // Tự động xử lý style khi disabled
  const getButtonStyle = () => {
    const baseStyle = { ...style, ...styleButton };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: "#ccc", // Màu xám khi disabled
        cursor: "not-allowed", // Cursor cấm khi disabled
      };
    }

    return baseStyle;
  };

  return (
    <Button
      size={size}
      variant={variant || type}
      style={getButtonStyle()}
      icon={icon}
      disabled={disabled}
      {...rest}
    >
      {textButton || children}
    </Button>
  );
};

export default ButtonComponent;
