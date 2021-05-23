import React, { useCallback, useEffect, useState } from "react";
import { fetchPokemonSpecies, fetchPokemonPage, fetchType } from "../../api";
import { Pokemon, PokemonName, PokemonType } from "../../models/pokemon";
import { Main } from "./styles";
import CardPokemon from "../../components/CardPokemon";
import InfoPokemon from "../../components/InfoPokemon";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../../components/Search";
import { debounce } from "../../utils";

const ITEMS_PER_PAGE = 30;

const Home: React.FC = () => {
  const [pokemonNames, setPokemonNames] = useState<PokemonName[]>([]);
  const [pokemonSearch, setPokemonSearch] = useState<PokemonName[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState<Pokemon[]>([]);
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>(null);

  const getPokemon = useCallback(async (poke: PokemonName) => {
    const pokemon = await fetchPokemonSpecies(poke);
    return pokemon;
  }, []);

  const getPokemons = useCallback(async () => {
    const data = await fetchPokemonPage();
    setPokemonNames(data);
  }, []);

  const getPokemonInfo = useCallback(
    (pokemon: Pokemon): Promise<PokemonType[]> =>
      fetchType(pokemon.types[0].name),
    []
  );

  const selectPokemon = useCallback(
    async (pokemon: Pokemon) => {
      if (!pokemon.weaknesses) {
        pokemon.weaknesses = await getPokemonInfo(pokemon);
      }

      setPokemonSelected(pokemon);
    },
    [setPokemonSelected, getPokemonInfo]
  );

  const getCurrentView = useCallback(
    async (pokeList: PokemonName[]) => {
      const pokes = pokeList.map((item) => getPokemon(item));
      const pokemons = await Promise.all(pokes);
      setCurrentView(pokemons);
    },
    [getPokemon]
  );

  const updatePokemonSearch = useCallback((pokemons) => {
    setCurrentPage(1);
    setPokemonSearch(pokemons);
  }, []);

  const filterPokemons = useCallback(
    debounce((pokeName: string) => {
      if (!pokeName) {
        updatePokemonSearch(pokemonNames);
        return;
      }

      const pokemons = pokemonNames.filter(({ name }) =>
        name.includes(pokeName.toLowerCase())
      );
      updatePokemonSearch(pokemons);
    }),
    [pokemonNames, updatePokemonSearch]
  );

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    updatePokemonSearch(pokemonNames);
  }, [pokemonNames, updatePokemonSearch]);

  useEffect(() => {
    const end = ITEMS_PER_PAGE * currentPage;
    const pokes = pokemonSearch.slice(0, end);
    getCurrentView(pokes);
  }, [currentPage, pokemonSearch, getCurrentView]);

  return (
    <>
      <Main>
        <Search onChange={filterPokemons} />
        <InfiniteScroll
          dataLength={currentView.length}
          next={() => setCurrentPage(currentPage + 1)}
          hasMore={!(currentView.length === pokemonSearch.length)}
          loader={<h4>Loading...</h4>}
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: " repeat(auto-fit, minmax(300px, 1fr))",
            padding: "32px",
          }}
        >
          {currentView.map(
            (pokemon) =>
              pokemon && (
                <CardPokemon
                  key={pokemon.name}
                  pokemon={pokemon}
                  onClick={selectPokemon}
                />
              )
          )}
        </InfiniteScroll>
      </Main>
      {pokemonSelected && (
        <InfoPokemon pokemon={pokemonSelected} onPokemonClick={selectPokemon} />
      )}
    </>
  );
};

export default Home;
