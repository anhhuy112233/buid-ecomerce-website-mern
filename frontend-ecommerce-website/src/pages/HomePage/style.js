import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  && {
    &:hover {
      color: #fff !important;
      background-color: rgb(13, 92, 182) !important;
      border-color: rgb(13, 92, 182) !important;
      transform: scale(1.02);
    }

    &:hover span {
      color: #fff !important;
    }
  }
`;

export const WrapperButtonMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const WrapperProducts = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
`;
