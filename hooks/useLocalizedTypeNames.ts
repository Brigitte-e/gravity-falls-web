"use client";

import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchTypeList, fetchType } from "@/app/api/types";
import { getLocalizedName } from "@/lib/locale";
import { capitalize } from "@/lib/pokeapi";
import type { Locale } from "@/lib/constants";

const EXCLUDED_TYPES = new Set(["unknown", "stellar"]);

export function useLocalizedTypeNames(locale: Locale) {
  const { data: list } = useQuery({
    queryKey: ["type-list"],
    queryFn: fetchTypeList,
    staleTime: Infinity,
  });

  const slugs = useMemo(
    () => list?.results.filter((t) => !EXCLUDED_TYPES.has(t.name)).map((t) => t.name) ?? [],
    [list],
  );

  const typeQueries = useQueries({
    queries: slugs.map((name) => ({
      queryKey: ["type", name],
      queryFn: () => fetchType(name),
      staleTime: Infinity,
      enabled: slugs.length > 0,
    })),
  });

  return useMemo(() => {
    const map = new Map<string, string>();
    slugs.forEach((slug, i) => {
      const data = typeQueries[i]?.data;
      map.set(
        slug,
        data ? getLocalizedName(data.names, locale, capitalize(slug)) : capitalize(slug),
      );
    });
    return map;
  }, [slugs, typeQueries, locale]);
}
