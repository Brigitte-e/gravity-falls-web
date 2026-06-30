"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { capitalize, getPokemonSprite } from "@/lib/pokeapi";
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from "@/lib/constants";
import { usePokemonOfTheDayStore } from "@/store/pokemon-of-the-day";
import { PokemonOfTheDayCardSkeleton } from "./PokemonOfTheDaySkeleton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { fetchPokemonSpecies } from "@/app/api/species";
import { useLocalizedTypeNames } from "@/hooks/useLocalizedTypeNames";
import { getLocalizedName } from "@/lib/locale";
import type { Locale } from "@/lib/constants";

interface PokemonOfTheDayLabels {
  mystery: string;
  mysteryType: string;
  viewDetails: string;
  reveal: string;
  height: string;
  weight: string;
  heightUnit: string;
  weightUnit: string;
  errorDefault: string;
  addFavorite: string;
  removeFavorite: string;
}

interface Props {
  labels: PokemonOfTheDayLabels;
  locale: Locale;
}

const subscribe = () => () => {};

export function PokemonOfTheDay({ labels, locale }: Props) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { pokemon, loading, error, reveal, clearIfStale } = usePokemonOfTheDayStore();
  const typeNames = useLocalizedTypeNames(locale);

  const { data: species } = useQuery({
    queryKey: ["pokemon-species", pokemon?.name],
    queryFn: () => fetchPokemonSpecies(pokemon!.name),
    enabled: !!pokemon,
    staleTime: Infinity,
  });

  const localizedPokemonName = pokemon
    ? species
      ? getLocalizedName(species.names, locale, capitalize(pokemon.name))
      : capitalize(pokemon.name)
    : labels.mystery;

  useEffect(() => {
    clearIfStale();
  }, [clearIfStale]);

  const sprite =
    pokemon?.sprites.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites.front_default ??
    (pokemon ? getPokemonSprite(pokemon.id) : null);

  if (!mounted || loading) {
    return <PokemonOfTheDayCardSkeleton />;
  }

  if (error) {
    return <p className="text-sm text-destructive">{labels.errorDefault}</p>;
  }

  return (
    <div className="relative flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 shadow-md w-full max-w-sm">
      {pokemon && (
        <div className="absolute top-4 right-4">
          <FavoriteButton
            id={pokemon.id}
            name={pokemon.name}
            addLabel={labels.addFavorite}
            removeLabel={labels.removeFavorite}
          />
        </div>
      )}

      {pokemon ? (
        <Image
          src={sprite ?? getPokemonSprite(pokemon.id)}
          alt={pokemon.name}
          width={160}
          height={160}
          className="object-contain drop-shadow-lg"
          priority
        />
      ) : (
        <div className="h-40 w-40 flex items-center justify-center rounded-2xl bg-muted text-6xl font-black text-muted-foreground select-none">
          ?
        </div>
      )}

      <h2 className="text-2xl font-bold">
        {localizedPokemonName}
      </h2>

      <div className="flex gap-2">
        {pokemon ? (
          pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="rounded-full px-3 py-1 text-xs font-bold uppercase text-white"
              style={{ backgroundColor: TYPE_COLORS[type.name] ?? DEFAULT_TYPE_COLOR }}
            >
              {typeNames.get(type.name) ?? type.name}
            </span>
          ))
        ) : (
          <span className="rounded-full px-3 py-1 text-xs font-bold uppercase bg-muted text-muted-foreground">
            {labels.mysteryType}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground mt-2">
        <span>{labels.height}</span>
        <span className="text-foreground font-medium">
          {pokemon ? `${(pokemon.height / 10).toFixed(1)}${labels.heightUnit}` : "? m"}
        </span>
        <span>{labels.weight}</span>
        <span className="text-foreground font-medium">
          {pokemon ? `${(pokemon.weight / 10).toFixed(1)}${labels.weightUnit}` : "? kg"}
        </span>
      </div>

      {pokemon ? (
        <Link
          href={`/${locale}/pokemon/${pokemon.name}`}
          className="mt-2 rounded-xl bg-pk-yellow/20 px-5 py-2 text-sm font-semibold text-pk-yellow hover:bg-pk-yellow/30 transition"
        >
          {labels.viewDetails}
        </Link>
      ) : (
        <button
          onClick={reveal}
          className="mt-2 rounded-2xl bg-pk-red px-8 py-3 text-base font-bold text-white shadow-lg transition hover:brightness-110"
        >
          {labels.reveal}
        </button>
      )}
    </div>
  );
}
