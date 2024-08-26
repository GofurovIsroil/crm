<script setup lang="ts">
import dayjs from "#build/dayjs.imports.mjs";
import { useDealSlideStore } from "~/store/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">0 offer</div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>
        {{ store.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Price">
      <h2>
        {{ convertCurrency(store.card?.price || 0) }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">
        <h2>
          {{ store.card?.status }}
        </h2>
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      <h2>
        {{ store.card?.companyName }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Date">
      <h2>
        {{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}
      </h2>
    </KanbanSlideoverLabel>
  </div>
</template>

<style scoped></style>
