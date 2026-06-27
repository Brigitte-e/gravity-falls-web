"use client";

import { useState } from "react";
import { capitalize } from "@/lib/pokeapi";
import { Pagination } from "@/components/pagination";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { MoveModal } from "@/components/MoveModal";
import { MOVE_LIST_PAGE_SIZE } from "@/lib/constants";
import { usePaginationUrl } from "@/hooks/usePaginationUrl";
import { useMoveListQuery } from "@/app/moves/hooks/useMoveListQuery";

export function MoveListClient() {
  const [page, setPage] = usePaginationUrl();
  const [openMove, setOpenMove] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useMoveListQuery({ page });

  const totalPages = data ? Math.ceil(data.count / MOVE_LIST_PAGE_SIZE) : 1;

  return (
    <>
      {openMove && (
        <MoveModal moveName={openMove} onClose={() => setOpenMove(null)} />
      )}

      {isLoading && <LoadingState variant="inline" />}
      {isError && (
        <ErrorState message={error instanceof Error ? error.message : undefined} />
      )}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {data.results.map((move) => (
              <li key={move.name}>
                <button
                  onClick={() => setOpenMove(move.name)}
                  className="w-full text-left rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-pk-yellow/40 hover:bg-card/80 transition-colors cursor-pointer"
                >
                  {capitalize(move.name)}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              hasPrevious={!!data.previous}
              hasNext={!!data.next}
              onPrevious={() => setPage(Math.max(1, page - 1))}
              onNext={() => setPage(page + 1)}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  );
}
