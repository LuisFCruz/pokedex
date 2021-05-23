export interface PokemonMap {
  [key: string]: Pokemon;
}

export interface PokemonName {
  name: string;
  id: number
}

export interface PokemonType {
  name: string;
}

export interface Specie {
  pokedexNumber: number;
  varieties: string[];
  evolutionChain: string;
}

export interface Pokemon extends Specie {
  name: string;
  id: number;
  index?: number;
  image: string;
  dominantType: string;
  types: PokemonType[];
  abilities: string[];
  weight: number;
  height: number;
  baseExperience: number;
  stats: PokemonStat[];
  isDefault: boolean;
  varietyName: string;
  weaknesses?: PokemonType[];
  evolutions?: PokemonEvolution;
}

export interface PokemonPage {
  results: PokemonName[];
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export type PokemonEvolution = [Pokemon, PokemonEvolution[]];
