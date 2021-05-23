import styled from "styled-components";

export const StatGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  gap: 16px;
  margin-bottom: 16px;
`;

export const StatContainer = styled.div`
  background: ${({ theme, color = "" }) =>
    color ? theme.colors.backgroundType[color] : "#e4e4e4"};
  padding: 4px 8px 4px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  font-weight: 700;
  color: ${({ color = "" }) => (color ? "#FFF" : "#000")};
`;

export const StatLabel = styled.span`
  border-radius: 50%;
  min-width: 30px;
  height: 30px;
  font-size: 12px;
  background: ${({ theme, color = "bug" }) => theme.colors.type[color]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
`;
