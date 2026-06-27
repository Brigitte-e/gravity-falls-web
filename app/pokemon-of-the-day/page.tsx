import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { PokemonOfTheDay } from "./features/pokemon-of-the-day";
import { t } from "@/lib/i18n";

export default function PokemonOfTheDayPage() {
  return (
    <PageContainer>
      <PageHeader
        title={t("pages.pokemonOfTheDay.title")}
        subtitle={t("pages.pokemonOfTheDay.subtitle")}
      />
      <PokemonOfTheDay />
    </PageContainer>
  );
}
