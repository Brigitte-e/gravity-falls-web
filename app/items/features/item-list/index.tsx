import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchItemList } from "@/app/api/items";
import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { ItemListClient } from "./ItemListClient";

interface Props {
  initialPage: number;
}

export async function ItemList({ initialPage }: Props) {
  const offset = (initialPage - 1) * ITEM_LIST_PAGE_SIZE;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["item-list", initialPage],
    queryFn: () => fetchItemList(offset, ITEM_LIST_PAGE_SIZE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemListClient />
    </HydrationBoundary>
  );
}
