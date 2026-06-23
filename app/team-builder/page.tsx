import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { TeamBuilder } from "./features/TeamBuilder";
import { t } from "@/lib/i18n";

export default function TeamBuilderPage() {
  return (
    <PageContainer>
      <PageHeader title={t("pages.teamBuilder.title")} subtitle={t("pages.teamBuilder.subtitle")} />
      <TeamBuilder />
    </PageContainer>
  );
}
