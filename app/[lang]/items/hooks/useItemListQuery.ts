"use client";

import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchItemList } from "@/app/api/items";

interface UseItemListQueryOptions {
  page: number;
}

export function useItemListQuery({ page }: UseItemListQueryOptions) {
  const offset = (page - 1) * ITEM_LIST_PAGE_SIZE;

  return useQuery({
    queryKey: ["item-list", page],
    queryFn: () => fetchItemList(offset, ITEM_LIST_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });
}
