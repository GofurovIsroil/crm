<script setup lang="ts">
import { menuData } from "./menu.data";
</script>

<template>
  <div>
    <NuxtLink
      class="flex items-center py-1 px-3 rounded-lg w-full text-white hover:bg-gray-700 hover:shadow transition-all mb-2.5"
      v-for="item in menuData"
      :key="item.title"
      :to="item.link"
    >
      <Icon :name="item.icon" class="mr-3" />
      <span>{{ item.title }}</span>
    </NuxtLink>
  </div>
</template>
