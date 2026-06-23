import { MoveList } from "./features/MoveList";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { fetchMoveList } from "@/app/api/moves";
import { MOVE_LIST_PAGE_SIZE } from "@/lib/constants";
import { parsePageParam } from "@/lib/pagination";
import { t } from "@/lib/i18n";
import type { MoveListInitialData } from "./hooks/useMoveListQuery";

export default async function MovesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const initialPage = parsePageParam(page);
  const offset = (initialPage - 1) * MOVE_LIST_PAGE_SIZE;
  const data = await fetchMoveList(offset, MOVE_LIST_PAGE_SIZE);

  const initialData: MoveListInitialData = {
    pages: [data],
    pageParams: [initialPage],
  };

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.moves.title")}
        subtitle={t("pages.moves.subtitle", { count: data.count.toLocaleString() })}
      />
      <MoveList initialData={initialData} />
    </PageContainer>
  );
}
