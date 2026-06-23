import { Suspense } from "react";
import { LoadingState } from "@/components/LoadingState";
import { TypeGrid } from "./features/TypeGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { t } from "@/lib/i18n";

export default async function TypesPage() {
  return (
    <PageContainer>
      <PageHeader title={t("pages.types.title")} subtitle={t("pages.types.subtitle")} />
      <Suspense fallback={<LoadingState variant="type-grid" />}>
        <TypeGrid />
      </Suspense>
    </PageContainer>
  );
}
