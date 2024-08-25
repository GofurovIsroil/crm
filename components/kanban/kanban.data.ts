import { EnumStatus } from "~/types/deals.types";
import type { IColumn } from "~/components/kanban/kanban.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "TO-DO",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "TO-BE-AGREED",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "IN-PROGRESS",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "PRODUCED",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "DONE",
    items: [],
  },
];
