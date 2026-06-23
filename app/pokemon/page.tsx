import { PageContainer } from "@/components/PageContainer";
import { parsePageParam } from "@/lib/pagination";
import { fetchPokemonList } from "@/app/api/pokemon";
import { fetchType } from "@/app/api/types";
import { fetchGeneration } from "@/app/api/generations";
import { POKEMON_LIST_PAGE_SIZE } from "@/lib/constants";
import { PokemonList } from "./features/PokemonList";
import { PokemonListHeader } from "./features/PokemonList/PokemonListHeader";
import type { PokemonListInitialData } from "./hooks/usePokemonListQuery";
import type { PokemonType } from "@/types";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ types?: string | string[]; generation?: string; page?: string }>;
}) {
  const { types, generation, page } = await searchParams;
  const selectedTypes = types
    ? (Array.isArray(types) ? types : types.split(",")).filter(Boolean)
    : [];
  const selectedGeneration = generation ?? null;
  const initialPage = parsePageParam(page);
  const isFiltered = selectedTypes.length > 0 || !!selectedGeneration;
  const sortedTypes = [...selectedTypes].sort();
  const offset = (initialPage - 1) * POKEMON_LIST_PAGE_SIZE;

  const [listData, generationData, ...typeData] = await Promise.all([
    isFiltered ? Promise.resolve(null) : fetchPokemonList(offset, POKEMON_LIST_PAGE_SIZE),
    selectedGeneration ? fetchGeneration(selectedGeneration) : Promise.resolve(null),
    ...sortedTypes.map(fetchType),
  ]);

  const initialData: PokemonListInitialData | undefined = listData
    ? { pages: [listData], pageParams: [initialPage] }
    : undefined;

  return (
    <PageContainer>
      <PokemonListHeader
        selectedTypes={selectedTypes}
        selectedGeneration={selectedGeneration}
      />
      <PokemonList
        initialData={initialData}
        types={selectedTypes}
        generation={selectedGeneration}
        initialTypeData={typeData as PokemonType[]}
        initialGenerationData={generationData ?? undefined}
      />
    </PageContainer>
  );
}
