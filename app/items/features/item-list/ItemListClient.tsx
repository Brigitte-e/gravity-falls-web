"use client";

import { useState } from "react";
import { capitalize, getItemSprite } from "@/lib/pokeapi";
import { Pagination } from "@/components/pagination";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ItemModal } from "@/components/ItemModal";
import { LazyImage } from "@/components/LazyImage";
import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { usePaginationUrl } from "@/hooks/usePaginationUrl";
import { useItemListQuery } from "@/app/items/hooks/useItemListQuery";

export function ItemListClient() {
  const [page, setPage] = usePaginationUrl();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useItemListQuery({ page });

  const totalPages = data ? Math.ceil(data.count / ITEM_LIST_PAGE_SIZE) : 1;

  return (
    <>
      {openItem && (
        <ItemModal itemName={openItem} onClose={() => setOpenItem(null)} />
      )}

      {isLoading && <LoadingState variant="inline" />}
      {isError && (
        <ErrorState message={error instanceof Error ? error.message : undefined} />
      )}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {data.results.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setOpenItem(item.name)}
                  className="w-full text-left rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-pk-yellow/40 hover:bg-card/80 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <LazyImage
                    src={getItemSprite(item.name)}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  {capitalize(item.name)}
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
