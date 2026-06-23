import { ItemList } from "./features/ItemList";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { fetchItemList } from "@/app/api/items";
import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { parsePageParam } from "@/lib/pagination";
import { t } from "@/lib/i18n";
import type { ItemListInitialData } from "./hooks/useItemListQuery";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const initialPage = parsePageParam(page);
  const offset = (initialPage - 1) * ITEM_LIST_PAGE_SIZE;
  const data = await fetchItemList(offset, ITEM_LIST_PAGE_SIZE);

  const initialData: ItemListInitialData = {
    pages: [data],
    pageParams: [initialPage],
  };

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.items.title")}
        subtitle={t("pages.items.subtitle", { count: data.count.toLocaleString() })}
      />
      <ItemList initialData={initialData} />
    </PageContainer>
  );
}
