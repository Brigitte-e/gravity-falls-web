import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchMoveList } from "@/app/api/moves";
import { MOVE_LIST_PAGE_SIZE } from "@/lib/constants";
import { MoveListClient } from "./MoveListClient";

interface Props {
  initialPage: number;
}

export async function MoveList({ initialPage }: Props) {
  const offset = (initialPage - 1) * MOVE_LIST_PAGE_SIZE;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["move-list", initialPage],
    queryFn: () => fetchMoveList(offset, MOVE_LIST_PAGE_SIZE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoveListClient />
    </HydrationBoundary>
  );
}
