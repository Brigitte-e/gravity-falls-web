import type { NamedResource, PokemonType } from "@/types";

export function intersectPokemon(typeDataList: PokemonType[]): NamedResource[] {
  if (typeDataList.length === 0) return [];
  const [first, ...rest] = typeDataList;
  const otherSets = rest.map(
    (td) => new Set(td.pokemon.map(({ pokemon: p }) => p.name)),
  );
  return first.pokemon
    .filter(({ pokemon: p }) => otherSets.every((s) => s.has(p.name)))
    .map(({ pokemon: p }) => p);
}
