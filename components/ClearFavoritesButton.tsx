"use client";

import { t } from "@/lib/i18n";

interface ClearFavoritesButtonProps {
  onClear: () => void;
}

export function ClearFavoritesButton({ onClear }: ClearFavoritesButtonProps) {
  return (
    <button
      onClick={onClear}
      className="mt-8 text-xs text-muted-foreground hover:text-destructive transition-colors"
    >
      {t("favorites.clearAll")}
    </button>
  );
}
