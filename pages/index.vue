<script lang="ts" setup>
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import dayjs from "dayjs";

useSeoMeta({
  title: "Home | CRM SYSTEM",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM SYSTEM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(col, i) in data" :key="col.id">
          <div
            class="text-center rounded bg-slate-700 py-1 px-5 mb-2 text-white text-base"
          >
            {{ col.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="col.id" />
          <UiCard
            v-for="card in col.items"
            :key="card.id"
            class="mb-3 bg-[#0e172a] text-white"
            draggable="true"
          >
            <UiCardHeader role="button">
              <UiCardTitle>{{ card.name }}</UiCardTitle>
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
  </div>
</template>

<style scoped></style>
