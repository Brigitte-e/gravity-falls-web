"use client";

import { useMemo } from "react";
import { TypeMultiSelect } from "@/components/TypeMultiSelect";
import type { TypeMultiSelectLabels } from "@/components/TypeMultiSelect";
import { useTypeListQuery } from "@/app/[lang]/pokemon/hooks/useTypeFilterQuery";
import { useLocalizedTypeNames } from "@/hooks/useLocalizedTypeNames";
import { capitalize } from "@/lib/pokeapi";
import type { Locale } from "@/lib/constants";

interface Props {
  selected: string[];
  onChange: (types: string[]) => void;
  labels: TypeMultiSelectLabels;
  locale: Locale;
}

export function TypeFilter({ selected, onChange, labels, locale }: Props) {
  const { data: types = [], isError } = useTypeListQuery();
  const typeNames = useLocalizedTypeNames(locale);

  const typeOptions = useMemo(
    () =>
      types.map((t) => ({
        name: t.name,
        displayName: typeNames.get(t.name) ?? capitalize(t.name),
      })),
    [types, typeNames],
  );

  // On error keep the control mounted with the current selection so the user can still clear active filters.
  return (
    <TypeMultiSelect
      types={isError ? [] : typeOptions}
      selected={selected}
      onChange={onChange}
      labels={labels}
    />
  );
}
