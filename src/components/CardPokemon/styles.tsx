import styled from "styled-components";

export const Card = styled.section`
  border-radius: 8px;
  background: ${({ theme, color = "" }) => theme.colors.backgroundType[color]};
  padding: 16px;
  position: relative;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  color: #fff;
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
