<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn('flex flex-col items-center xl:items-start gap-y-1.5 p-3', props.class)
    "
  >
    <slot />
  </div>
</template>
