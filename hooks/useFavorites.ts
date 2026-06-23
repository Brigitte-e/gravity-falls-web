"use client";

import { FAVORITES_STORAGE_KEY } from "@/lib/constants";
import { useState } from "react";

export interface FavoriteEntry {
  id: number;
  name: string;
}

export function getFavorites(): FavoriteEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(favs: FavoriteEntry[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(getFavorites);

  function toggle(entry: FavoriteEntry) {
    const isFav = favorites.some((f) => f.id === entry.id);
    const updated = isFav
      ? favorites.filter((f) => f.id !== entry.id)
      : [...favorites, entry];
    saveFavorites(updated);
    setFavorites(updated);
  }

  function remove(id: number) {
    const updated = favorites.filter((f) => f.id !== id);
    saveFavorites(updated);
    setFavorites(updated);
  }

  function clear() {
    saveFavorites([]);
    setFavorites([]);
  }

  function isFavorite(id: number) {
    return favorites.some((f) => f.id === id);
  }

  return { favorites, toggle, remove, clear, isFavorite };
}
