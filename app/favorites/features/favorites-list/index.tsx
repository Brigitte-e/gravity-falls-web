"use client";

import { FavoriteCard } from "@/components/FavoriteCard";
import { ClearFavoritesButton } from "@/components/ClearFavoritesButton";
import { useFavorites } from "@/hooks/useFavorites";
import { t } from "@/lib/i18n";

export function FavoritesList() {
  const { favorites, remove, clear } = useFavorites();

  if (favorites.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        {t("favorites.empty")}
      </p>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-8 text-sm">
        {t("favorites.savedCount", { count: favorites.length })}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {favorites.map((fav) => (
          <FavoriteCard key={fav.id} id={fav.id} name={fav.name} onRemove={remove} />
        ))}
      </div>

      <ClearFavoritesButton onClear={clear} />
    </>
  );
}
