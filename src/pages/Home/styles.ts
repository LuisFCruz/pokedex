import styled from "styled-components";

export const Main = styled.main`
  /* padding: 24px; */

  @media screen and (min-width: 1023px) {
    /* padding: 32px; */
    margin-right: 336px;
  }
`;

export const ListPokemon = styled.section`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-height: 100%;
`;
