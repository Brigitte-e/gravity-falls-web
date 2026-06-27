"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parsePageParam } from "@/components/pagination/pagination";

export function usePaginationUrl(): [number, (page: number) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parsePageParam(searchParams.get("page") ?? undefined);

  const setPage = useCallback(
    (nextPage: number) => {
      if (nextPage === page) return;

      const params = new URLSearchParams(searchParams.toString());

      if (nextPage <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(nextPage));
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      window.scrollTo(0, 0);
    },
    [router, pathname, searchParams, page],
  );

  return [page, setPage];
}
