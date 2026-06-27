import { formatGenerationLabel, t } from "@/lib/i18n";

export function getFilterHeading(types: string[], generation: string | null): string {
  if (types.length === 1 && !generation) return t("pokemonList.withType");
  if (types.length > 1 && !generation) return t("pokemonList.matchingTypes");
  if (types.length === 0 && generation) {
    return t("pokemonList.fromGeneration", { generation: formatGenerationLabel(generation) });
  }
  return t("pokemonList.matchingFilters");
}
