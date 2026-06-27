import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { parsePageParam } from "@/components/pagination/pagination";
import { t } from "@/lib/i18n";
import { ItemList } from "./features/item-list";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const initialPage = parsePageParam(page);

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.items.title")}
        subtitle={t("pages.items.subtitle")}
      />
      <ItemList initialPage={initialPage} />
    </PageContainer>
  );
}
