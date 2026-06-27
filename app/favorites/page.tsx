import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { FavoritesList } from "./features/favorites-list";
import { t } from "@/lib/i18n";

export default function FavoritesPage() {
  return (
    <PageContainer>
      <PageHeader title={t("pages.favorites.title")} />
      <FavoritesList />
    </PageContainer>
  );
}
