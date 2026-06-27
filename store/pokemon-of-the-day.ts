import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPokemon } from "@/lib/pokeapi";
import type { Pokemon } from "@/types/pokemon";

const STORAGE_KEY = "pokemon-of-the-day";
const TOTAL_POKEMON = 1025;

function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

interface PokemonOfTheDayState {
  pokemonId: number | null;
  pokemon: Pokemon | null;
  date: string | null;
  loading: boolean;
  error: boolean;
  reveal: () => Promise<void>;
  clearIfStale: () => void;
}

export const usePokemonOfTheDayStore = create<PokemonOfTheDayState>()(
  persist(
    (set, get) => ({
      pokemonId: null,
      pokemon: null,
      date: null,
      loading: false,
      error: false,
      clearIfStale() {
        if (get().date !== todayString()) {
          set({ pokemonId: null, pokemon: null, date: null });
        }
      },

      async reveal() {
        if (get().date === todayString() && get().pokemonId !== null && get().pokemon !== null) return;
        const id = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
        set({ pokemonId: id, date: todayString(), loading: true, error: false, pokemon: null });
        try {
          const pokemon = await fetchPokemon(id);
          set({ pokemon, loading: false });
        } catch {
          set({ loading: false, error: true });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        pokemonId: state.pokemonId,
        pokemon: state.pokemon,
        date: state.date,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.date !== todayString()) {
          usePokemonOfTheDayStore.setState({ pokemonId: null, pokemon: null, date: null });
        }
      },
    }
  )
);
