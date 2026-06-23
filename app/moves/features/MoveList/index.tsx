import { MoveListClient } from "./MoveListClient";
import { type MoveListInitialData } from "../../hooks/useMoveListQuery";

interface Props {
  initialData: MoveListInitialData;
}

export function MoveList({ initialData }: Props) {
  return <MoveListClient initialData={initialData} />;
}
