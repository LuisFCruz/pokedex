import styled from "styled-components";

export const ContainerEvolution = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

export const PokeEvolution = styled.div`
  margin: 0 auto;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  padding: 5px;
  background-color: ${({ theme, color = "" }) =>
    theme.colors.backgroundType[color]};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ImageEvolution = styled.img`
  width: 100%;
  height: 100%;
`;

export const MultiEvolutions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 8px 16px;
`;

export const IconEvolution = styled.div<{ rotate?: string }>`
  text-align: ${({ rotate }) => {
    if (rotate === "25deg") {
      return "right";
    }
    if (rotate === "-25deg") {
      return "left";
    }
    return "center";
  }};

  svg {
    width: 24px;
    height: 24px;
    color: #5d5d5d;
    transform: ${({ rotate = "0deg" }) => `rotate(${rotate})`};
  }
`;
