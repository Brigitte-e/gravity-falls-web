import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchItemList, fetchItem } from "@/app/api/items";
import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { ItemListClient } from "./ItemListClient";
import type { ItemModalLabels } from "@/components/ItemModal";
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
  itemModalLabels: ItemModalLabels;
  listLabels: ListLabels;
  locale?: Locale;
}

export async function ItemList({ initialPage, itemModalLabels, listLabels, locale = "en" }: Props) {
  const offset = (initialPage - 1) * ITEM_LIST_PAGE_SIZE;
  const queryClient = new QueryClient();

  const list = await fetchItemList(offset, ITEM_LIST_PAGE_SIZE);
  queryClient.setQueryData(["item-list", initialPage], list);

  await Promise.all(
    list.results.map((item) =>
      fetchItem(item.name)
        .then((data) => queryClient.setQueryData(["item", item.name], data))
        .catch(() => null)
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemListClient itemModalLabels={itemModalLabels} listLabels={listLabels} locale={locale} />
    </HydrationBoundary>
  );
}
