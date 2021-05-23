import React, { useCallback, useEffect, useState } from "react";
import { fetchPokemonVarieties } from "../../../api";
import { Pokemon } from "../../../models/pokemon";
import { ContainerVariety, ImageVariety, PokeVariety } from "./styles";

export interface VarietiesProps {
  pokemon: Pokemon;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const Varieties: React.FC<VarietiesProps> = ({ pokemon, onPokemonClick }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const getVarieties = useCallback(async () => {
    const promises = pokemon.varieties.map((name) =>
      fetchPokemonVarieties(pokemon, name)
    );
    const pokes = await Promise.all(promises);
    setPokemons(pokes);
  }, [pokemon]);

  useEffect(() => {
    getVarieties();
  }, [getVarieties]);

  return (
    <ContainerVariety>
      {pokemons.map((pokemon) => (
        <PokeVariety
          key={pokemon.varietyName}
          color={pokemon.dominantType}
          onClick={() => onPokemonClick(pokemon)}
        >
          <ImageVariety src={pokemon.image} />
        </PokeVariety>
      ))}
    </ContainerVariety>
  );
};

export default Varieties;
