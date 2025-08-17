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
  ...rest
}) => {
  return (
    <Button
      size={size}
      variant={variant || type}
      style={{ ...style, ...styleButton }}
      icon={icon}
      {...rest}
    >
      {textButton || children}
    </Button>
  );
};

export default ButtonComponent;