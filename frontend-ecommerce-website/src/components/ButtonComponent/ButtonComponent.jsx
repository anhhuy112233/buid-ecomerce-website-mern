import React from "react";
import { Button } from "antd";

const ButtonComponent = ({
  size,
  bordered,
  style,
  icon,
  children,
  ...rest
}) => {
  return (
    <Button
      size={size}
      bordered={bordered}
      style={style}
      icon={icon}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;