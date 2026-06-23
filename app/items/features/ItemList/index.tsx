import { fetchItemList } from "@/app/api/items";
import { ITEM_LIST_PAGE_SIZE } from "@/lib/constants";
import { ItemListClient } from "./ItemListClient";
import { type ItemListInitialData } from "../../hooks/useItemListQuery";

export async function ItemList() {
  const data = await fetchItemList(0, ITEM_LIST_PAGE_SIZE);

  const initialData: ItemListInitialData = {
    pages: [data],
    pageParams: [1],
  };

  return <ItemListClient initialData={initialData} />;
}
