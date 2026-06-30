"use client";

import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { capitalize } from "@/lib/pokeapi";
import { getLocalizedName } from "@/lib/locale";
import { fetchMove } from "@/app/api/moves";
import { MoveModal, type MoveModalLabels } from "@/components/MoveModal";
import type { NamedResource } from "@/types";
import type { Locale } from "@/lib/constants";

interface Props {
  moves: NamedResource[];
  title: string;
  moveModalLabels: MoveModalLabels;
  locale?: Locale;
}

export function TypeMoves({ moves, title, moveModalLabels, locale = "en" }: Props) {
  const [openMove, setOpenMove] = useState<string | null>(null);

  const moveQueries = useQueries({
    queries: moves.map((move) => ({
      queryKey: ["move", move.name],
      queryFn: () => fetchMove(move.name),
      staleTime: Infinity,
    })),
  });

  function getDisplayName(slug: string, index: number) {
    const data = moveQueries[index]?.data;
    if (data) return getLocalizedName(data.names, locale, capitalize(slug));
    return capitalize(slug);
  }

  if (moves.length === 0) return null;

  return (
    <>
      {openMove && (
        <MoveModal
          moveName={openMove}
          onClose={() => setOpenMove(null)}
          labels={moveModalLabels}
          locale={locale}
        />
      )}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-pk-yellow/60 mb-4">
          {title} <span className="text-muted-foreground font-normal">({moves.length})</span>
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {moves.map((move, index) => (
            <li key={move.name}>
              <button
                onClick={() => setOpenMove(move.name)}
                className="w-full text-left rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-medium hover:border-pk-yellow/40 hover:bg-card/80 transition-colors cursor-pointer"
              >
                {getDisplayName(move.name, index)}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
