import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { PokemonOfTheDay } from "./features/pokemon-of-the-day";
import { getDictionary, t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function PokemonOfTheDayPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const labels = {
    mystery: t(dict, "pokemonOfTheDay.mystery"),
    mysteryType: t(dict, "pokemonOfTheDay.mysteryType"),
    viewDetails: t(dict, "pokemonOfTheDay.viewDetails"),
    reveal: t(dict, "pokemonOfTheDay.reveal"),
    height: t(dict, "pokemonDetail.height"),
    weight: t(dict, "pokemonDetail.weight"),
    heightUnit: t(dict, "pokemonDetail.heightUnit"),
    weightUnit: t(dict, "pokemonDetail.weightUnit"),
    errorDefault: t(dict, "common.errorDefault"),
    addFavorite: t(dict, "favorites.add"),
    removeFavorite: t(dict, "favorites.remove"),
  };

  return (
    <PageContainer>
      <PageHeader
        title={t(dict, "pages.pokemonOfTheDay.title")}
        subtitle={t(dict, "pages.pokemonOfTheDay.subtitle")}
      />
      <PokemonOfTheDay labels={labels} locale={lang as Locale} />
    </PageContainer>
  );
}
