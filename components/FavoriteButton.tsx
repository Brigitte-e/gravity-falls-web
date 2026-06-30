"use client";

import { cn } from "@/lib/utils/cn";
import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteItem } from "@/types/favorite";

interface FavoriteButtonProps {
  /** Numeric Pokémon id or any string id — converted to string internally. */
  id: number | string;
  name: string;
  image?: string;
  type?: string;
  source?: string;
  addLabel?: string;
  removeLabel?: string;
}

export function FavoriteButton({
  id,
  name,
  image,
  type,
  source,
  addLabel = "Add to favorites",
  removeLabel = "Remove from favorites",
}: FavoriteButtonProps) {
  const { isFavorite, toggle, isAuthenticated } = useFavorites();
  const stringId = String(id);
  const isFav = isFavorite(stringId);

  if (!isAuthenticated) return null;

  const item: Omit<FavoriteItem, "createdAt"> = { id: stringId, name, image, type, source };

  return (
    <button
      onClick={() => { toggle(item).catch(console.error); }}
      aria-label={isFav ? removeLabel : addLabel}
      className={cn(
        "rounded-full p-2 text-xl transition-all hover:scale-110 active:scale-95",
        isFav ? "text-pk-yellow" : "text-muted-foreground/40 hover:text-pk-yellow/60"
      )}
    >
      {isFav ? "★" : "☆"}
    </button>
  );
}
