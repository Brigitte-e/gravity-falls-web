"use client";

import { GenerationSelect } from "@/components/GenerationSelect";
import type { GenerationSelectLabels } from "@/components/GenerationSelect";
import { useGenerationListQuery } from "@/app/[lang]/pokemon/hooks/useGenerationFilterQuery";

interface Props {
  selected: string | null;
  onChange: (generation: string | null) => void;
  labels: GenerationSelectLabels;
}

export function GenerationFilter({ selected, onChange, labels }: Props) {
  const { data: generations = [], isError } = useGenerationListQuery();

  // On error keep the control mounted with the current selection so the user can still clear an active filter.
  // Pass an empty list — GenerationSelect renders just the "All generations" option.
  return (
    <GenerationSelect
      generations={isError ? [] : generations}
      selected={selected}
      onChange={onChange}
      labels={labels}
    />
  );
}
