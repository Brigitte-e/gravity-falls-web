"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { t } from "@/lib/i18n";

interface FavoriteCardProps {
  id: number;
  name: string;
  onRemove: (id: number) => void;
}

export function FavoriteCard({ id, name, onRemove }: FavoriteCardProps) {
  return (
    <div className="relative group/fav">
      <CharacterCard id={id} name={name} />
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-xs text-muted-foreground opacity-0 group-hover/fav:opacity-100 hover:text-destructive transition-all"
        aria-label={t("favorites.remove")}
      >
        ✕
      </button>
    </div>
  );
}
