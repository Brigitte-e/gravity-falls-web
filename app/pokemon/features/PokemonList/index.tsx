import { PokemonListClient } from "./PokemonListClient";
import { type PokemonListInitialData } from "../../hooks/usePokemonListQuery";
import type { Generation, PokemonType } from "@/types";

interface Props {
  types: string[];
  generation: string | null;
  initialData?: PokemonListInitialData;
  initialTypeData?: PokemonType[];
  initialGenerationData?: Generation;
}

export function PokemonList({
  types,
  generation,
  initialData,
  initialTypeData = [],
  initialGenerationData,
}: Props) {
  return (
    <PokemonListClient
      initialData={initialData}
      types={types}
      generation={generation}
      initialTypeData={initialTypeData}
      initialGenerationData={initialGenerationData}
    />
  );
}
