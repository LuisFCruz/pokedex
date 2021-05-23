import React, { useCallback, useEffect, useState } from "react";
import { Pokemon, PokemonEvolution } from "../../../models/pokemon";
import { ReactComponent as ChevronDown } from "../../../assets/chevron-down.svg";
import {
  ContainerEvolution,
  IconEvolution,
  ImageEvolution,
  MultiEvolutions,
  PokeEvolution,
} from "./styles";
import { fetchEvolutions } from "../../../api";

interface EvolutionProps {
  evolutions?: any[];
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export const Evolution: React.FC<EvolutionProps> = ({
  evolutions,
  pokemon,
  onClick,
}) => {
  const evolutionContainer = useCallback(
    (evolutions?: any[]) => {
      if (!evolutions?.length) {
        return null;
      }

      const elements = evolutions.map(([poke, evol]: any) => (
        <Evolution
          key={poke.name}
          pokemon={poke}
          evolutions={evol}
          onClick={onClick}
        />
      ));

      if (evolutions.length === 1) {
        return (
          <>
            <IconEvolution>
              <ChevronDown />
            </IconEvolution>
            {elements}
          </>
        );
      }

      return (
        <MultiEvolutions>
          <IconEvolution rotate="25deg">
            <ChevronDown />
          </IconEvolution>
          <IconEvolution rotate="-25deg">
            <ChevronDown />
          </IconEvolution>
          {elements}
        </MultiEvolutions>
      );
    },
    [onClick]
  );

  return (
    <div>
      <PokeEvolution
        color={pokemon.dominantType}
        onClick={() => onClick(pokemon)}
      >
        <ImageEvolution src={pokemon.image} />
      </PokeEvolution>
      {evolutionContainer(evolutions)}
    </div>
  );
};

interface EvolutionsProps {
  pokemon: Pokemon;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const Evolutions: React.FC<EvolutionsProps> = ({ pokemon, onPokemonClick }) => {
  const [evolutions, setEvolutions] = useState<PokemonEvolution>();

  const getEvolutions = useCallback(async () => {
    const data = await fetchEvolutions(pokemon);
    setEvolutions(data);
  }, [pokemon, setEvolutions]);

  useEffect(() => {
    pokemon && getEvolutions();
  }, [pokemon, getEvolutions]);

  const [poke, evolut] = evolutions ?? [];

  return (
    <ContainerEvolution>
      {poke && (
        <Evolution
          pokemon={poke}
          evolutions={evolut}
          onClick={onPokemonClick}
        />
      )}
    </ContainerEvolution>
  );
};

export default Evolutions;
