import { TypeGrid } from "./features/TypeGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { fetchTypeList } from "@/app/api/types";
import { t } from "@/lib/i18n";

export default async function TypesPage() {
  const data = await fetchTypeList();

  return (
    <PageContainer>
      <PageHeader title={t("pages.types.title")} subtitle={t("pages.types.subtitle")} />
      <TypeGrid data={data} />
    </PageContainer>
  );
}
