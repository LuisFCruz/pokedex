import { fetchPokemonSpecies } from "../api";
import { PokemonEvolution } from "../models/pokemon";

export const extractPokemonName = ({ name, url }: any) => {
  const [, id] = url.match(/\/([\d]{1,4})\/$/);
  return { name, id: Number(id) };
};

export const extractEvolutions = async (
  evolution: any
): Promise<PokemonEvolution> => {
  const { species, evolvesTo } = evolution;

  const promises: Iterable<PromiseLike<any>> = evolvesTo
    ? evolvesTo.map(extractEvolutions)
    : Promise.resolve([]);
  const pokemon = await fetchPokemonSpecies(extractPokemonName(species));

  const aggr: any[] = await Promise.all(promises);

  return [{ ...pokemon }, aggr];
};

export function debounce<F extends (...params: any[]) => any>(
  fn: F,
  timeout = 300
) {
  let timer: number;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
