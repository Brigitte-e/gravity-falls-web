"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Character {
  _id: number;
  name: string;
  imageUrl?: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  url: string;
}

interface ApiResponse {
  data: Character;
}

async function fetchCharacter(id: string): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/character/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}

function DetailSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {title}
      </h2>
      {items.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-300 dark:text-zinc-600">—</p>
      )}
    </div>
  );
}

const SECTIONS: { title: string; key: keyof Character }[] = [
  { title: "TV Shows", key: "tvShows" },
  { title: "Films", key: "films" },
  { title: "Short Films", key: "shortFilms" },
  { title: "Video Games", key: "videoGames" },
  { title: "Park Attractions", key: "parkAttractions" },
  { title: "Allies", key: "allies" },
  { title: "Enemies", key: "enemies" },
];

export default function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    staleTime: 5 * 60 * 1000,
  });

  const character = data?.data;

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-6 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          ← Back to Characters
        </Link>

        {isLoading && (
          <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
        )}

        {isError && (
          <p className="text-red-500">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        )}

        {character && (
          <div className="flex flex-col gap-6">
            {/* Hero */}
            <div className="flex items-start gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              {character.imageUrl && (
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="h-36 w-36 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                />
              )}
              <div className="flex flex-col gap-3 pt-1">
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                    {character.name}
                  </h1>
                  <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                    ID #{character._id}
                  </p>
                </div>
                <a
                  href={character.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Disney Wiki ↗
                </a>
              </div>
            </div>

            {/* All detail sections */}
            <div className="grid grid-cols-1 gap-px rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              {SECTIONS.map(({ title, key }) => (
                <div
                  key={key}
                  className="flex flex-col gap-2 bg-white dark:bg-zinc-900 px-6 py-4"
                >
                  <DetailSection
                    title={title}
                    items={character[key] as string[]}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
