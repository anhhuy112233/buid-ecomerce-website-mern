import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
  border-top: none;
  boder-right: none;
  boder-left: none;
  outline: none;
  &: focus {
    background-color: rgb(232, 240, 254);
  }
`;
