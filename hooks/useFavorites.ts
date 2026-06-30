"use client";

import { useEffect, useCallback, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useFavoritesStore } from "@/store/favorites";
import {
  addFavorite,
  removeFavorite,
  subscribeToFavorites,
} from "@/lib/services/favorites";
import type { FavoriteItem } from "@/types/favorite";

export type { FavoriteEntry } from "@/types/favorite";

export interface UseFavoritesResult {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggle: (item: Omit<FavoriteItem, "createdAt">) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export function useFavorites(): UseFavoritesResult {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.loading);

  const [firestoreItems, setFirestoreItems] = useState<FavoriteItem[] | null>(null);

  const guestFavorites = useFavoritesStore((s) => s.favorites);
  const guestToggle = useFavoritesStore((s) => s.toggle);
  const guestRemove = useFavoritesStore((s) => s.remove);
  const guestClear = useFavoritesStore((s) => s.clear);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = subscribeToFavorites(user.uid, (items) => {
      setFirestoreItems(items);
    });
    return () => {
      unsubscribe();
      setFirestoreItems(null);
    };
  }, [user]);

  const isAuthenticated = Boolean(user);

  // null means the subscription hasn't delivered its first snapshot yet
  const firestoreLoading = isAuthenticated && firestoreItems === null;

  const favorites: FavoriteItem[] = isAuthenticated
    ? (firestoreItems ?? [])
    : guestFavorites.map((f) => ({ id: String(f.id), name: f.name }));

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggle = useCallback(
    async (item: Omit<FavoriteItem, "createdAt">) => {
      if (!user) {
        const numId = Number(item.id);
        if (!Number.isNaN(numId)) guestToggle({ id: numId, name: item.name });
        return;
      }
      if (isFavorite(item.id)) {
        await removeFavorite(user.uid, item.id);
      } else {
        await addFavorite(user.uid, item);
      }
    },
    [user, isFavorite, guestToggle]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user) {
        const numId = Number(id);
        if (!Number.isNaN(numId)) guestRemove(numId);
        return;
      }
      await removeFavorite(user.uid, id);
    },
    [user, guestRemove]
  );

  const clear = useCallback(async () => {
    if (!user) {
      guestClear();
      return;
    }
    await Promise.all((firestoreItems ?? []).map((f) => removeFavorite(user.uid, f.id)));
  }, [user, firestoreItems, guestClear]);

  return {
    favorites,
    isFavorite,
    toggle,
    remove,
    clear,
    isAuthenticated,
    loading: authLoading || firestoreLoading,
  };
}
