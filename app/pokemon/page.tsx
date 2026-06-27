import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PageContainer } from "@/components/PageContainer";
import { parsePageParam } from "@/components/pagination/pagination";
import { fetchPokemonList } from "@/app/api/pokemon";
import { fetchType } from "@/app/api/types";
import { fetchGeneration } from "@/app/api/generations";
import { POKEMON_LIST_PAGE_SIZE } from "@/lib/constants";
import { PokemonListClient } from "./features/pokemon-list";
import { PokemonFilters } from "./features/pokemon-filters";

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

  const queryClient = new QueryClient();

  await Promise.all([
    !isFiltered
      ? queryClient.prefetchQuery({
          queryKey: ["pokemon-list", initialPage],
          queryFn: () => fetchPokemonList(offset, POKEMON_LIST_PAGE_SIZE),
        })
      : Promise.resolve(),
    selectedGeneration
      ? queryClient.prefetchQuery({
          queryKey: ["generation", selectedGeneration],
          queryFn: () => fetchGeneration(selectedGeneration),
        })
      : Promise.resolve(),
    sortedTypes.length > 0
      ? queryClient.prefetchQuery({
          queryKey: ["types-multi", sortedTypes],
          queryFn: () => Promise.all(sortedTypes.map(fetchType)),
        })
      : Promise.resolve(),
  ]);

  return (
    <PageContainer>
      <PokemonFilters
        selectedTypes={selectedTypes}
        selectedGeneration={selectedGeneration}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonListClient types={selectedTypes} generation={selectedGeneration} />
      </HydrationBoundary>
    </PageContainer>
  );
}
