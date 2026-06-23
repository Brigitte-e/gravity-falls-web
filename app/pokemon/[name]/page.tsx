import { fetchPokemon } from "@/app/api/pokemon";
import { ErrorState } from "@/components/ErrorState";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { PokemonHero } from "./features/PokemonHero";
import { PokemonStats } from "./features/PokemonStats";
import { PokemonAbilities } from "./features/PokemonAbilities";
import { PokemonMoves } from "./features/PokemonMoves";
import { t } from "@/lib/i18n";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;

  let pokemon;
  try {
    pokemon = await fetchPokemon(name);
  } catch (err) {
    return (
      <PageContainer>
        <PageHeader backHref="/pokemon" backLabel={t("pokemonDetail.backToPokedex")} title="" />
        <ErrorState message={err instanceof Error ? err.message : undefined} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader backHref="/pokemon" backLabel={t("pokemonDetail.backToPokedex")} title="" />
      <div className="flex flex-col gap-6">
        <PokemonHero pokemon={pokemon} />
        <PokemonStats stats={pokemon.stats} />
        <PokemonAbilities abilities={pokemon.abilities} />
        <PokemonMoves moves={pokemon.moves} />
      </div>
    </PageContainer>
  );
}
