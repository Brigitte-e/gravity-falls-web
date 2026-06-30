import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import type { FavoriteItem } from "@/types/favorite";

function favoritesRef(userId: string) {
  return collection(getFirebaseDb(), "users", userId, "favorites");
}

function favoriteDocRef(userId: string, itemId: string) {
  return doc(getFirebaseDb(), "users", userId, "favorites", itemId);
}

export async function addFavorite(
  userId: string,
  item: Omit<FavoriteItem, "createdAt">
): Promise<void> {
  const data = Object.fromEntries(
    Object.entries({ ...item, createdAt: serverTimestamp() }).filter(
      ([, v]) => v !== undefined
    )
  );
  await setDoc(favoriteDocRef(userId, item.id), data);
}

export async function removeFavorite(
  userId: string,
  itemId: string
): Promise<void> {
  await deleteDoc(favoriteDocRef(userId, itemId));
}

export async function getFavorites(userId: string): Promise<FavoriteItem[]> {
  const snap = await getDocs(favoritesRef(userId));
  return snap.docs.map((d) => d.data() as FavoriteItem);
}

export function subscribeToFavorites(
  userId: string,
  callback: (items: FavoriteItem[]) => void
): Unsubscribe {
  return onSnapshot(favoritesRef(userId), (snap) => {
    const items = snap.docs.map((d) => d.data() as FavoriteItem);
    callback(items);
  });
}
