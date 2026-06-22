"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Character {
  _id: number;
  name: string;
  imageUrl?: string;
  videoGames: string[];
}

interface ApiResponse {
  data: Character[];
  info: {
    count: number;
    totalPages: number;
    previousPage: string | null;
    nextPage: string | null;
  };
}

async function fetchGameCharacters(): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/character?videoGames=Gravity%20Falls`);
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}

export default function GamesPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["game-characters"],
    queryFn: fetchGameCharacters,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-6 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Video Game Characters
        </h1>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          ← All Characters
        </Link>
      </div>

      {isLoading && (
        <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
      )}

      {isError && (
        <p className="text-red-500">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}

      {data && (
        <>
          <p className="w-full max-w-3xl text-sm text-zinc-400 dark:text-zinc-500 mb-6">
            {data.info.count} characters appeared in Gravity Falls video games
          </p>

          <ul className="grid grid-cols-2 gap-4 w-full max-w-3xl sm:grid-cols-3 md:grid-cols-4">
            {data.data.map((character) => (
              <li key={character._id}>
                <Link
                  href={`/character/${character._id}`}
                  className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-center hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm transition-all"
                >
                  {character.imageUrl && (
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {character.name}
                  </span>
                  {character.videoGames.length > 0 && (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2">
                      {character.videoGames.join(", ")}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
