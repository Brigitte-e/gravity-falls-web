"use client";

import { cn } from "@/lib/utils/cn";
import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteEntry } from "@/types/favorite";

export type { FavoriteEntry };

interface FavoriteButtonProps extends FavoriteEntry {
  addLabel?: string;
  removeLabel?: string;
}

export function FavoriteButton({ id, name, addLabel = "Add to favorites", removeLabel = "Remove from favorites" }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const isFav = isFavorite(id);

  return (
    <button
      onClick={() => toggle({ id, name })}
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
