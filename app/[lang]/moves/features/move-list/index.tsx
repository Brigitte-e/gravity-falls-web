import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchMoveList, fetchMove } from "@/app/api/moves";
import { MOVE_LIST_PAGE_SIZE } from "@/lib/constants";
import { MoveListClient } from "./MoveListClient";
import type { MoveModalLabels } from "@/components/MoveModal";
import type { Locale } from "@/lib/constants";

interface ListLabels {
  previous: string;
  next: string;
  pageOfTotalPattern: string;
  pagination: string;
  loading: string;
  errorDefault: string;
}

interface Props {
  initialPage: number;
  moveModalLabels: MoveModalLabels;
  listLabels: ListLabels;
  locale?: Locale;
}

export async function MoveList({ initialPage, moveModalLabels, listLabels, locale = "en" }: Props) {
  const offset = (initialPage - 1) * MOVE_LIST_PAGE_SIZE;
  const queryClient = new QueryClient();

  const list = await fetchMoveList(offset, MOVE_LIST_PAGE_SIZE);
  queryClient.setQueryData(["move-list", initialPage], list);

  await Promise.all(
    list.results.map((m) =>
      fetchMove(m.name)
        .then((move) => queryClient.setQueryData(["move", m.name], move))
        .catch(() => null)
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoveListClient moveModalLabels={moveModalLabels} listLabels={listLabels} locale={locale} />
    </HydrationBoundary>
  );
}
