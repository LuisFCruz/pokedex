import styled from "styled-components";

export const InfoItem = styled.div`
  margin-top: 16px;
`;

export const Cap = styled.div`
  border-radius: 24px;
  background: #e4e4e4;
  text-align: center;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  flex: 1 1 0;
  box-sizing: border-box;
  white-space: nowrap;
`;

export const InfoTitle = styled.h3`
  font-size: 12px;
  margin: 0 0 8px;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 0 16px;
  margin-bottom: 16px;
`;

export const FullGrid = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;
