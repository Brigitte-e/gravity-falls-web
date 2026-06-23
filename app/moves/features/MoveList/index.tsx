import { fetchMoveList } from "@/app/api/moves";
import { MOVE_LIST_PAGE_SIZE } from "@/lib/constants";
import { MoveListClient } from "./MoveListClient";
import { type MoveListInitialData } from "../../hooks/useMoveListQuery";

export async function MoveList() {
  const data = await fetchMoveList(0, MOVE_LIST_PAGE_SIZE);

  const initialData: MoveListInitialData = {
    pages: [data],
    pageParams: [1],
  };

  return <MoveListClient initialData={initialData} />;
}
