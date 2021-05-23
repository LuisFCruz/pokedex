import React from "react";
import { Pokemon } from "../../models/pokemon";
import About from "./About";
import Tabs, { Panel } from "../Tabs";
import Tag, { TagGroup } from "../Tag";
import Evolutions from "./Evolutions";
import Stats from "./Stats";
import { Circle, Container, Header, Image, Number, Title } from "./styles";
import Varieties from "./Variations";

interface Props {
  pokemon: Pokemon;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const InfoPokemon: React.FC<Props> = ({ pokemon, onPokemonClick }) => {
  return (
    <Container color={pokemon.dominantType}>
      <Header>
        <Number>#{pokemon.pokedexNumber}</Number>
        <Title>{pokemon.isDefault ? pokemon.name : pokemon.varietyName}</Title>
        <Circle>
          <Image src={pokemon.image} />
        </Circle>
        <TagGroup centered>
          {pokemon.types.map(({ name }) => (
            <Tag key={name} icon={name} color={name}>
              {name}
            </Tag>
          ))}
        </TagGroup>
      </Header>
      <Tabs>
        <Panel key={"about"} name="About">
          <About pokemon={pokemon} />
        </Panel>
        <Panel key={"stats"} name="Stats">
          <Stats stats={pokemon.stats} />
        </Panel>
        <Panel key={"evolutions"} name="Evolutions">
          <Evolutions pokemon={pokemon} onPokemonClick={onPokemonClick} />
        </Panel>
        {pokemon.varieties.length ? (
          <Panel key="variações" name="Variações">
            <Varieties pokemon={pokemon} onPokemonClick={onPokemonClick} />
          </Panel>
        ) : null}
      </Tabs>
    </Container>
  );
};

export default InfoPokemon;
