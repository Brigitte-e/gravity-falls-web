"use client";

import { useMemo } from "react";
import { FavoriteCard } from "@/components/FavoriteCard";
import { ClearFavoritesButton } from "@/components/ClearFavoritesButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocalizedPokemonNames } from "@/hooks/useLocalizedPokemonNames";
import type { Locale } from "@/lib/constants";

interface FavLabels {
  empty: string;
  savedCountPattern: string;
  removeLabel: string;
  clearAll: string;
}

interface Props {
  labels: FavLabels;
  locale: Locale;
}

export function FavoritesList({ labels, locale }: Props) {
  const { favorites, remove, clear } = useFavorites();

  const names = useMemo(() => favorites.map((f) => f.name), [favorites]);
  const pokemonNames = useLocalizedPokemonNames(names, locale);

  if (favorites.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        {labels.empty}
      </p>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-8 text-sm">
        {labels.savedCountPattern.replace("{count}", String(favorites.length))}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {favorites.map((fav) => (
          <FavoriteCard
            key={fav.id}
            id={fav.id}
            name={fav.name}
            displayName={pokemonNames.get(fav.name)}
            locale={locale}
            onRemove={remove}
            removeLabel={labels.removeLabel}
          />
        ))}
      </div>

      <ClearFavoritesButton onClear={clear} label={labels.clearAll} />
    </>
  );
}
