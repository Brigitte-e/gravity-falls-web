import { Suspense } from "react";
import { LoadingState } from "@/components/LoadingState";
import { PageContainer } from "@/components/PageContainer";
import { PokemonList } from "./features/PokemonList";
import { PokemonListHeader } from "./features/PokemonList/PokemonListHeader";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ types?: string | string[]; generation?: string }>;
}) {
  const { types, generation } = await searchParams;
  const selectedTypes = types
    ? (Array.isArray(types) ? types : types.split(",")).filter(Boolean)
    : [];
  const selectedGeneration = generation ?? null;

  return (
    <PageContainer>
      <Suspense fallback={<LoadingState variant="inline" />}>
        <PokemonListHeader
          selectedTypes={selectedTypes}
          selectedGeneration={selectedGeneration}
        />
      </Suspense>
      <Suspense fallback={<LoadingState variant="grid" />}>
        <PokemonList types={selectedTypes} generation={selectedGeneration} />
      </Suspense>
    </PageContainer>
  );
}
