"use client";

import { CharacterCard } from "@/components/CharacterCard";
import type { Locale } from "@/lib/constants";

interface FavoriteCardProps {
  id: number;
  name: string;
  displayName?: string;
  locale: Locale;
  onRemove: (id: number) => void;
  removeLabel?: string;
}

export function FavoriteCard({
  id,
  name,
  displayName,
  locale,
  onRemove,
  removeLabel = "Remove from favorites",
}: FavoriteCardProps) {
  return (
    <div className="relative group/fav">
      <CharacterCard id={id} name={name} displayName={displayName} locale={locale} />
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-xs text-muted-foreground opacity-0 group-hover/fav:opacity-100 hover:text-destructive transition-all"
        aria-label={removeLabel}
      >
        ✕
      </button>
    </div>
  );
}
