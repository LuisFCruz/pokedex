import styled from "styled-components";

export const Container = styled.section`
  background: ${({ theme, color = "" }) => theme.colors.backgroundType[color]};
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1023px) {
    border-radius: 8px;
    top: 32px;
    bottom: 32px;
    right: 32px;
    width: 304px;
  }
`;

export const Header = styled.div`
  position: relative;
  padding: 24px;
`;

export const Title = styled.h2`
  margin: 0 0 16px;
  color: #333;
  text-transform: capitalize;
  display: flex;
  align-items: center;
`;

export const Number = styled.span`
  opacity: 0.8;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-right: 8px;
  position: absolute;
  top: 24px;
  right: 8px;
`;

export const Circle = styled.div`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 100%;
`;
