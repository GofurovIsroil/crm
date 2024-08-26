import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";
import type { ICard } from "./kanban.types";

// Предположим, что DB.listDocuments импортирован или доступен в контексте
// import { DB } from '~/db'; // Обязательно добавьте правильный импорт

export const useKanbanQuery = () => {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      try {
        // Убедитесь, что DB.listDocuments корректно импортирован и доступен
        const response = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
        return response;
      } catch (error) {
        console.error("Error fetching deals:", error);
        throw error; // Передача ошибки для обработки в компоненте
      }
    },
    select(data) {
      const newBoard = [...KANBAN_DATA];
      const deals = data.documents as unknown as ICard[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.id,
            name: deal.name,
            price: deal.price,
            companyName: deal.companyName, // Обработка отсутствующих данных
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
};
