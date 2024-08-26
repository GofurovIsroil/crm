<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import dayjs from "dayjs";
import type { EnumStatus } from "~/types/deals.types";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import { useDealSlideStore } from "~/store/deal-slide.store";

useSeoMeta({
  title: "Home | CRM SYSTEM",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const router = useRouter();

const { data, isLoading, refetch } = useKanbanQuery();

const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
  name: string;
  price: number;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: async ({ docId, status, name, price }: TypeMutationVariables) => {
    try {
      // Check if the document already exists
      await DB.getDocument(DB_ID, COLLECTION_DEALS, docId);
      // If it exists, update the document
      return DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        status,
        name,
        price,
      });
    } catch (error) {
      // If the document doesn't exist, create a new one
      if (error.code === 404) {
        return DB.createDocument(DB_ID, COLLECTION_DEALS, docId, {
          status,
          name,
          price,
        });
      } else {
        throw error;
      }
    }
  },
  onSuccess: (data) => {
    refetch();
    console.log("Card moved successfully:", data);
  },
  onError: (error) => {
    console.error("Error moving card:", error);
  },
});

const handleDragStart = (card: ICard, column: IColumn) => {
  console.log("Dragging card:", card);
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (targetColumn: IColumn) => {
  if (dragCardRef.value && sourceColumnRef.value) {
    console.log("Moving card with data:", {
      docId: dragCardRef.value.id,
      name: dragCardRef.value.name, // Проверяем наличие имени
      status: targetColumn.id,
    });

    mutate({
      docId: dragCardRef.value.id,
      name: dragCardRef.value.name, // Передаём имя
      status: targetColumn.id,
      price: dragCardRef.value.price,
    });
  } else {
    console.error("Card or column is missing");
  }
};
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM SYSTEM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-5">
        <div
          v-for="(col, i) in data"
          :key="col.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(col)"
          class="min-h-screen"
        >
          <div
            class="text-center rounded bg-slate-700 py-1 px-5 mb-2 text-white text-base"
            :style="generateColumnStyle(i, data?.length)"
          >
            {{ col.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="col.id" />
          <UiCard
            v-for="card in col.items"
            :key="card.id"
            class="mb-3 bg-[#0e172a] text-white cursor-pointer"
            draggable="true"
            @dragstart="() => handleDragStart(card, col)"
          >
            <UiCardHeader role="button">
              <div
                class="flex flex-col gap-1 w-full items-center justify-between xl:flex-row"
              >
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <p
                  @click="store.set(card)"
                  class="bg-white text-slate-800 p-0.5 rounded-sm"
                >
                  About
                </p>
              </div>
              <UiCardDescription>{{
                convertCurrency(card.price)
              }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>{{ card.companyName }}</UiCardContent>
            <UiCardFooter>{{
              dayjs(card.$createdAt).format("DD MMMM YYYY")
            }}</UiCardFooter>
          </UiCard>
        </div>
      </div>
    </div>
    <KanbanSlideoverSlideOver />
  </div>
</template>

<style scoped></style>
