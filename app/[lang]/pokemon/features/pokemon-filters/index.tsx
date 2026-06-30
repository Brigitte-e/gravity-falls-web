"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { TypeFilter } from "@/app/[lang]/pokemon/features/type-filter";
import { GenerationFilter } from "@/app/[lang]/pokemon/features/generation-filter";
import { PageHeader } from "@/components/PageHeader";

import type { Locale } from "@/lib/constants";

interface GenerationLabels {
  filterByGeneration: string;
  allGenerations: string;
  generationPattern: string;
  generationPrefix: string;
}

interface TypeMultiSelectLabels {
  filterByType: string;
  typesSelectedPattern: string;
  clearAll: string;
  searchPlaceholder: string;
  noTypesFound: string;
  scrollForMore: string;
  removeTypePattern: string;
  clearSearch: string;
}

interface Props {
  selectedTypes: string[];
  selectedGeneration: string | null;
  title: string;
  genLabels: GenerationLabels;
  typeLabels: TypeMultiSelectLabels;
  locale: Locale;
}

function buildQueryString(types: string[], generation: string | null): string {
  const params = new URLSearchParams();
  if (types.length > 0) params.set("types", types.join(","));
  if (generation) params.set("generation", generation);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function PokemonFilters({
  selectedTypes,
  selectedGeneration,
  title,
  genLabels,
  typeLabels,
  locale,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters = useCallback(
    (types: string[], generation: string | null) => {
      router.replace(`${pathname}${buildQueryString(types, generation)}`, { scroll: false });
    },
    [router, pathname],
  );

  const handleTypeChange = useCallback(
    (types: string[]) => updateFilters(types, selectedGeneration),
    [updateFilters, selectedGeneration],
  );

  const handleGenerationChange = useCallback(
    (generation: string | null) => updateFilters(selectedTypes, generation),
    [updateFilters, selectedTypes],
  );

  return (
    <PageHeader
      title={title}
      rightSlot={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <GenerationFilter
            selected={selectedGeneration}
            onChange={handleGenerationChange}
            labels={genLabels}
          />
          <TypeFilter
            selected={selectedTypes}
            onChange={handleTypeChange}
            labels={typeLabels}
            locale={locale}
          />
        </div>
      }
    />
  );
}
