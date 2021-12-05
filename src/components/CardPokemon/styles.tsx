import styled from "styled-components";

export const Card = styled.section`
  border-radius: 8px;
  background: ${({ theme, color = "" }) => theme.colors.backgroundType[color]};
  padding: 16px;
  position: relative;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const CardTitle = styled.h2`
  color: #333;
  text-transform: capitalize;
  margin: 0 0 8px;
`;

export const CardImage = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  right: -24px;
  top: -24px;
`;
