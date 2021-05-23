import styled from 'styled-components';

export const ContainerVariety = styled.section`
  display: flex;
  gap: 16px;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  flex-wrap: wrap;
`;


export const PokeVariety = styled.div`
  border-radius: 50%;
  width: 96px;
  height: 96px;
  padding: 5px;
  background-color: ${({ theme, color = "" }) =>
    theme.colors.backgroundType[color]};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ImageVariety = styled.img`
  width: 100%;
  height: 100%;
`;
