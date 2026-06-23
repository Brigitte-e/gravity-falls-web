import { Suspense } from "react";
import { LoadingState } from "@/components/LoadingState";
import { ItemList } from "./features/ItemList";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { fetchItemList } from "@/app/api/items";
import { t } from "@/lib/i18n";

export default async function ItemsPage() {
  const { count } = await fetchItemList(0, 1);

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.items.title")}
        subtitle={t("pages.items.subtitle", { count: count?.toLocaleString() ?? 0 })}
      />
      <Suspense fallback={<LoadingState variant="item-list" />}>
        <ItemList />
      </Suspense>
    </PageContainer>
  );
}
