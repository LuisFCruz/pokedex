import React from "react";
import { Pokemon } from "../../../models/pokemon";
import Tag, { TagGroup } from "../../Tag";
import { Cap, FullGrid, Grid, InfoItem, InfoTitle } from "./styles";

interface AboutProps {
  pokemon: Pokemon;
}

const About: React.FC<AboutProps> = ({ pokemon }) => {
  return (
    <div>
      <InfoTitle>Abilities</InfoTitle>
      <FullGrid>
        {pokemon.abilities.map((ability) => (
          <Cap key={ability}>{ability.replace(/-/g, " ")}</Cap>
        ))}
      </FullGrid>
      <Grid>
        <InfoItem>
          <InfoTitle>Height</InfoTitle>
          <Cap>{pokemon.height}m </Cap>
        </InfoItem>
        <InfoItem>
          <InfoTitle>Weight</InfoTitle>
          <Cap>{pokemon.weight}kg</Cap>
        </InfoItem>
        <InfoItem>
          <InfoTitle>Base Exp</InfoTitle>
          <Cap>{pokemon.baseExperience}</Cap>
        </InfoItem>
      </Grid>
      <InfoTitle>Weaknesses</InfoTitle>
      <TagGroup centered>
        {pokemon.weaknesses?.map(({ name }) => (
          <Tag key={name} icon={name} color={name}></Tag>
        ))}
      </TagGroup>
    </div>
  );
};

export default About;
