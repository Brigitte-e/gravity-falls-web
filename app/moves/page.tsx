import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { parsePageParam } from "@/components/pagination/pagination";
import { t } from "@/lib/i18n";
import { MoveList } from "./features/move-list";

export default async function MovesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const initialPage = parsePageParam(page);

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.moves.title")}
        subtitle={t("pages.moves.subtitle")}
      />
      <MoveList initialPage={initialPage} />
    </PageContainer>
  );
}
