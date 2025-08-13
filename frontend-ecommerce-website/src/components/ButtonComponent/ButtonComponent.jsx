import React from "react";
import { Button } from "antd";

const ButtonComponent = ({
  size,
  variant,
  style,
  icon,
  children,
  ...rest
}) => {
  return (
    <Button
      size={size}
      variant={variant}
      style={style}
      icon={icon}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;