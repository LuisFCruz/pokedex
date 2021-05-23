import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
`;

interface ListItemProps {
  active: boolean;
}

export const Item = styled.div<ListItemProps>`
  padding: 12px 16px;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  color: rgba(250, 250, 250, 0.8);
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;

  ${({ active = false }) =>
    active &&
    `
      background: #FFF;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      color: #000;

      &:not(:first-child)::before {
        content: '';
        border-bottom: 16px solid #ffffff;
        border-right: 16px solid #ffffff;
        border-bottom-right-radius: 90%;
        width: 24px;
        height: 16px;
        position: absolute;
        bottom: -16px;
        left: -24px;
        z-index: -1;
      }

      &::after {
        content: '';
        border-bottom: 16px solid #ffffff;
        border-left: 16px solid #ffffff;
        border-bottom-left-radius: 90%;
        width: 24px;
        height: 16px;
        position: absolute;
        bottom: -16px;
        right: -24px;
        z-index: -1;
      }

      &:first-child {
        border-top-left-radius: 0px;
      }
  `}
`;
