import React from "react";
import { Pokemon } from "../../models/pokemon";
import Tag, { TagGroup } from "../Tag";
import { Card, CardImage, CardTitle } from "./styles";

interface Props {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

const CardPokemon: React.FC<Props> = ({ pokemon, onClick }) => {
  return (
    <Card color={pokemon.dominantType} onClick={() => onClick(pokemon)}>
      <CardTitle>
        #{pokemon.id} {pokemon.name}
      </CardTitle>
      <TagGroup>
        {pokemon.types.map(({ name }) => (
          <Tag key={name} icon={name} color={name}>
            {name}
          </Tag>
        ))}
      </TagGroup>
      <CardImage src={pokemon.image} />
    </Card>
  );
};

export default CardPokemon;
