import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteEntry } from "@/app/favorites/utils/favoriteEntry";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";

interface FavoritesState {
  favorites: FavoriteEntry[];
  toggle: (entry: FavoriteEntry) => void;
  remove: (id: number) => void;
  clear: () => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggle(entry) {
        const current = get().favorites;
        const exists = current.some((f) => f.id === entry.id);
        set({ favorites: exists ? current.filter((f) => f.id !== entry.id) : [...current, entry] });
      },

      remove(id) {
        set({ favorites: get().favorites.filter((f) => f.id !== id) });
      },

      clear() {
        set({ favorites: [] });
      },

      isFavorite(id) {
        return get().favorites.some((f) => f.id === id);
      },
    }),
    { name: FAVORITES_STORAGE_KEY }
  )
);
