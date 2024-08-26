<script setup lang="ts">
import dayjs from "#build/dayjs.imports.mjs";
import type { IDeal } from "~/types/deals.types";
import { useCreateComment } from "./useCreateComment";
import { useComments } from "./useComments";

const { data, isLoading, refetch } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IDeal;
</script>

<template>
  <UiInput
    placeholder="Comment here"
    v-model="commentRef"
    @keyup.enter="writeComment"
  />

  <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
  <div v-else-if="card">
    <div
      v-for="comment in card?.comments"
      :key="comment.$id"
      class="flex items-start mt-5"
    >
      <Icon name="radix-icons:chat-bubble" size="25" class="mr-3 mt-1" />
      <div class="border-border bg-black/20 rounded p-3 w-full">
        <div class="mb-2 text-sm">
          Comment {{ dayjs(comment.$createdAt).format("HH:mm") }}
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
