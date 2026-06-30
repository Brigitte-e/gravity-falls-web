"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "@/app/api/species";
import { getLocalizedName } from "@/lib/locale";
import { capitalize } from "@/lib/pokeapi";
import type { Locale } from "@/lib/constants";

export function useLocalizedPokemonNames(names: string[], locale: Locale) {
  const speciesQueries = useQueries({
    queries: names.map((name) => ({
      queryKey: ["pokemon-species", name],
      queryFn: () => fetchPokemonSpecies(name),
      staleTime: Infinity,
    })),
  });

  return useMemo(() => {
    const map = new Map<string, string>();
    names.forEach((name, i) => {
      const data = speciesQueries[i]?.data;
      map.set(
        name,
        data ? getLocalizedName(data.names, locale, capitalize(name)) : capitalize(name),
      );
    });
    return map;
  }, [names, speciesQueries, locale]);
}
