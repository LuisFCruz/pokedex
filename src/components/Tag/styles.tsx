import styled from "styled-components";

interface TagGroupProps {
  centered?: boolean;
}

export const TagGroup = styled.div<TagGroupProps>`
  display: flex;
  gap: 8px;
  justify-content: ${({ centered = false }) =>
    centered ? "center" : "flex-star"};
`;

export const TagContent = styled.div`
  padding: 8px;
  border-radius: 24px;
  background: ${({ theme, color = "" }) => theme.colors.type[color]};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 12px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: #fff;
    }
  }

  svg + * {
    margin-left: 8px;
  }
`;
