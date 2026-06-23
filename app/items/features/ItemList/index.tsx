import { ItemListClient } from "./ItemListClient";
import { type ItemListInitialData } from "../../hooks/useItemListQuery";

interface Props {
  initialData: ItemListInitialData;
}

export function ItemList({ initialData }: Props) {
  return <ItemListClient initialData={initialData} />;
}
