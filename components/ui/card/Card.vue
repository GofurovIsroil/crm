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
      cn(
        'rounded-lg border bg-card text-card-foreground border-transparent animation transition-all hover:border-purple-900',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    border-color: #4a148c; /* Эквивалентно классу border-purple-900 */
    transform: scale(0.5) translateY(-30px);
    opacity: 0.5;
  }
  90% {
    border-color: #4a148c; /* Эквивалентно классу border-purple-900 */
  }
  to {
    border-color: transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.5s ease-in-out;
}
</style>
