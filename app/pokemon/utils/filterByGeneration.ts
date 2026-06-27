import type { NamedResource } from "@/types";

export function filterByGeneration(
  pokemon: NamedResource[],
  species: NamedResource[],
): NamedResource[] {
  const speciesSet = new Set(species.map((s) => s.name));
  return pokemon.filter((p) => speciesSet.has(p.name));
}
