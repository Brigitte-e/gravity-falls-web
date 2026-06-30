"use client";

interface ClearFavoritesButtonProps {
  onClear: () => void;
  label?: string;
}

export function ClearFavoritesButton({ onClear, label = "Clear all favorites" }: ClearFavoritesButtonProps) {
  return (
    <button
      onClick={onClear}
      className="mt-8 text-xs text-muted-foreground hover:text-destructive transition-colors"
    >
      {label}
    </button>
  );
}
