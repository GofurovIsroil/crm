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
    @apply border-purple-900 scale-50 translate-y-[-30px] opacity-50;
  }
  90% {
    @apply border-purple-900;
  }
  to {
    @apply border-transparent scale-100 translate-y-0 opacity-100;
  }
}

.animation {
  animation: show 0.5s ease-in-out;
}
</style>
