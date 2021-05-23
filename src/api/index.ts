import {
  Pokemon,
  PokemonType,
  PokemonStat,
  PokemonName,
  PokemonEvolution,
} from "../models/pokemon";
import EvolutionService from "../services/evolutions.service";
import PokemonService from "../services/pokemon.service";
import { extractEvolutions, extractPokemonName } from "../utils";
import client from "./client";

const retry = async (
  url: string,
  [first, last]: Array<string | number | undefined>
): Promise<any> => {
  try {
    return await client.get(`${url}${first}`);
  } catch (error) {
    if (last && error?.response?.status === 404) {
      return client.get(`${url}${last}`);
    }

    throw error;
  }
};

export const fetchPokemonPage = async (): Promise<PokemonName[]> => {
  const pokeStorage = localStorage.getItem("pokemons");

  if (pokeStorage) {
    return Promise.resolve(JSON.parse(pokeStorage));
  }

  const generations = [1, 2, 3, 4, 5, 6, 7, 8];

  const promises = generations.map((generation) =>
    client.get(`generation/${generation}/`)
  );
  const responses = await Promise.all(promises);

  const page = responses
    .map(({ data }) =>
      data.pokemonSpecies
        .map(extractPokemonName)
        .sort((a: PokemonName, b: PokemonName) => a.id - b.id)
    )
    .flat();

  localStorage.setItem("pokemons", JSON.stringify(page));

  return page;
};

const fetchSpecie = async (poke: PokemonName): Promise<Pokemon> => {
  const { data: specie } = await retry("pokemon-species/", Object.values(poke));
  const pokemon = await fetchPokemon(poke);

  const { name, varieties, pokedexNumbers, evolutionChain } = specie as any;

  return {
    name,
    pokedexNumber: pokedexNumbers.find(
      ({ pokedex }: any) => pokedex.name === "national"
    ).entryNumber,
    varieties: varieties.reduce((aggr: any, { pokemon, isDefault }: any) => {
      if (isDefault) {
        return aggr;
      }

      return [...aggr, pokemon.name];
    }, []),
    evolutionChain: evolutionChain.url,
    ...pokemon,
  };
};

const fetchPokemon = async (poke: { name: string; id?: number }) => {
  const { data: pokemon } = await retry(`pokemon/`, Object.values(poke));

  const {
    id,
    isDefault,
    sprites: { other, frontDefault },
    types: pType,
    abilities,
    weight,
    height,
    baseExperience,
    stats,
    name: varietyName,
  } = pokemon;

  const type = pType.map(({ type }: any) => {
    return {
      name: type.name,
    };
  });

  return {
    id,
    image:
      other.dreamWorld.frontDefault ??
      other.officialArtwork.frontDefault ??
      frontDefault,
    dominantType: type[0].name,
    types: type,
    abilities: abilities.map(({ ability }: any) =>
      ability.name.replace(
        /(^[a-z]|-[a-z])/g,
        (match: string, letter: string) => letter.toUpperCase()
      )
    ),
    weight: weight / 10,
    height: height / 10,
    baseExperience,
    isDefault,
    stats: stats.map(
      ({ baseStat: value, stat: { name } }: any) => ({
        name,
        value,
      }),
      []
    ) as PokemonStat[],
    varietyName,
  };
};

export const fetchPokemonSpecies = async (
  poke: PokemonName
): Promise<Pokemon> => {
  const pokemonDb = new PokemonService();
  const storagePokemon = await pokemonDb.get<Pokemon>(poke.name);

  if (storagePokemon) {
    return storagePokemon;
  }

  const pokemon = await fetchSpecie(poke);

  pokemonDb.add(poke.name, pokemon);

  return pokemon;
};

export const fetchPokemonVarieties = async (
  pokemon: Pokemon,
  varietyName: string
) => {
  const pokemonDb = new PokemonService();
  const storagePokemon = await pokemonDb.get<Pokemon>(varietyName);
  if (storagePokemon) {
    return storagePokemon;
  }

  const variety = await fetchPokemon({ name: varietyName });
  const poke = { ...pokemon, ...variety };

  pokemonDb.add(varietyName, poke);

  return poke;
};

export const fetchType = async (type: string): Promise<PokemonType[]> => {
  const {
    data: {
      damageRelations: { doubleDamageFrom },
    },
  } = await client.get(`type/${type}`);

  return doubleDamageFrom.map((type: any) => {
    return {
      name: type.name,
    };
  });
};

export const fetchEvolutions = async ({
  evolutionChain,
}: Pokemon): Promise<PokemonEvolution> => {
  const evolutionDb = new EvolutionService();
  const storeChain = await evolutionDb.get(evolutionChain);

  if (storeChain) {
    return extractEvolutions(storeChain);
  }

  const {
    data: { chain },
  } = await client.get<any>(evolutionChain);

  evolutionDb.add(evolutionChain, chain);

  return extractEvolutions(chain);
};

//pokemon-species
//varieties
//growthRate
//flavorTextEntries
//eggGroups
//baseHappiness
//captureRate
//envolves
