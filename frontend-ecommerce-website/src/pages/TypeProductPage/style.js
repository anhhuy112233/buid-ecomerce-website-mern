import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.nav`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
`;

export const WrapperNavbar = styled(Col)`
  background: #fff;
  margin-right: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  height: fit-content;
  width: 200px;
`;
