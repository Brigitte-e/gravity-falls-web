import { fetchType } from "@/app/api/types";
import { ErrorState } from "@/components/ErrorState";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { TypeHeader } from "./features/type-header";
import { TypeDamageRelations } from "./features/type-damage-relations";
import { TypeMoves } from "./features/type-moves";
import { t } from "@/lib/i18n";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function TypeDetailPage({ params }: Props) {
  const { name } = await params;

  let type;
  try {
    type = await fetchType(name);
  } catch (err) {
    return (
      <PageContainer>
        <PageHeader backHref="/types" backLabel={t("typeDetail.backToTypes")} title="" />
        <ErrorState message={err instanceof Error ? err.message : undefined} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader backHref="/types" backLabel={t("typeDetail.backToTypes")} title="" />
      <div className="flex flex-col gap-6">
        <TypeHeader name={type.name} />
        <TypeDamageRelations type={type} />
        <TypeMoves moves={type.moves} />
      </div>
    </PageContainer>
  );
}
